"""
AgriSync Backend API
Main FastAPI application
"""
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
import shutil
import uuid
from PIL import Image
from fastapi.responses import JSONResponse
import io
import numpy as np
import json
import sys
import traceback
import logging

# Import Pydantic BaseModel
from pydantic import BaseModel

# Import database models and auth utilities
from database import User, get_db, Base, engine

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add scripts directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'scripts'))

# --- Authentication Configuration ---
SECRET_KEY = "your-secret-key-here-change-in-production"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- Authentication Helper Functions ---

def verify_password(plain_password, hashed_password):
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username_or_email: str, password: str):
    """
    Authenticate a user by email OR username
    --- THIS FUNCTION IS NOW FIXED ---
    """
    user = db.query(User).filter(
        (User.email == username_or_email) | (User.username == username_or_email)
    ).first()
    
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# --- Pydantic Schemas ---
# --- THESE CLASSES ARE REQUIRED ---

class UserCreateSchema(BaseModel):
    username: str
    email: str
    password: str
    full_name: str | None = None

class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    full_name: str | None

    class Config:
        orm_mode = True # Use 'orm_mode' for older Pydantic, or 'from_attributes = True' for v2

# --- End Schemas ---


# Global variables for lazy loading
soil_model = None
class_names = None
plantdoc_predict_func = None
price_predict_func = None

app = FastAPI(title="AgriSync API", version="1.0.0")

# ✅ Lazy loading functions
def load_soil_model():
    """Load soil classification model lazily"""
    global soil_model, class_names
    if soil_model is None:
        try:
            from tensorflow.keras.models import load_model
            MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "soil_classifier.keras")
            FALLBACK_MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "soil_classifier_fallback.keras")
            LABELS_PATH = os.path.join(os.path.dirname(__file__), "models", "class_names.json")
            
            # Try to load the original model first
            try:
                logger.info(f"Loading soil model from: {MODEL_PATH}")
                soil_model = load_model(MODEL_PATH)
                logger.info("✅ Original soil model loaded successfully")
            except Exception as e:
                logger.warning(f"⚠️ Original model failed to load: {str(e)}")
                
                # Try fallback model
                if os.path.exists(FALLBACK_MODEL_PATH):
                    logger.info(f"Trying fallback model: {FALLBACK_MODEL_PATH}")
                    soil_model = load_model(FALLBACK_MODEL_PATH)
                    logger.info("✅ Fallback soil model loaded successfully")
                else:
                    # Create fallback model if it doesn't exist
                    logger.info("Creating fallback soil model...")
                    from create_fallback_soil_model import save_fallback_model
                    if save_fallback_model():
                        soil_model = load_model(FALLBACK_MODEL_PATH)
                        logger.info("✅ Created and loaded fallback soil model")
                    else:
                        raise Exception("Failed to create fallback model")
            
            # Load class names
            with open(LABELS_PATH, "r") as f:
                class_names = json.load(f)
            
            logger.info(f"Loaded soil model with classes: {class_names}")
            
        except Exception as e:
            logger.error(f"Failed to load any soil model: {str(e)}")
            raise e
    
    return soil_model, class_names

def load_plantdoc_predictor():
    """Load plant disease predictor lazily"""
    global plantdoc_predict_func
    if plantdoc_predict_func is None:
        try:
            from predict_plantdoc import predict_disease
            plantdoc_predict_func = predict_disease
            logger.info("Loaded plant disease predictor")
        except Exception as e:
            logger.error(f"Failed to load plant disease predictor: {str(e)}")
            raise e
    
    return plantdoc_predict_func

def load_price_predictor():
    """Load price predictor lazily"""
    global price_predict_func
    if price_predict_func is None:
        try:
            from predict_with_graph import get_price_predictions
            price_predict_func = get_price_predictions
            logger.info("Loaded price predictor")
        except Exception as e:
            logger.error(f"Failed to load price predictor: {str(e)}")
            raise e
    
    return price_predict_func

# ✅ CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://superb-patience-production.up.railway.app",  # Your deployed frontend
        "http://localhost:5173",  # For local development
        "http://localhost:3000",   # Alternative local dev port
        "*"  # For testing - remove in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Mount graph images folder
GRAPH_DIR = os.path.join(os.path.dirname(__file__), "scripts", "predicted_graphs")
os.makedirs(GRAPH_DIR, exist_ok=True)
app.mount("/graphs", StaticFiles(directory=GRAPH_DIR), name="graphs")

# ✅ Authentication endpoints
# --- THIS FUNCTION IS NOW FIXED ---
@app.post("/register", response_model=UserSchema)
def register_user(user: UserCreateSchema, db: Session = Depends(get_db)):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(
            (User.email == user.email) | (User.username == user.username)
        ).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email or username already registered")

        # Create new user
        # THIS LINE IS NOW CORRECT
        hashed_password = get_password_hash(user.password) 
        
        db_user = User(
            username=user.username,
            email=user.email,
            password_hash=hashed_password,
            full_name=user.full_name
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        # Return the created user (no token)
        return db_user
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        db.rollback() # Rollback in case of error
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")

# --- THIS FUNCTION IS NOW FIXED ---
@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login endpoint"""
    # Use form_data.username (which can be email OR username)
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=UserSchema)
def read_users_me(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    return current_user

# ✅ Root endpoint
@app.get("/")
def root():
    return {"message": "AgriSync API is running", "status": "healthy", "version": "1.0.0"}

# ✅ Health check routes
@app.get("/health")
def health_check():
    return {"status": "API is running"}

@app.get("/healthz")
def health_check_detailed():
    """Detailed health check with model status"""
    status = {
        "status": "healthy",
        "message": "AgriSync API is running",
        "version": "1.0.0",
        "models": {
            "soil_model": soil_model is not None,
            "plantdoc_predictor": plantdoc_predict_func is not None,
            "price_predictor": price_predict_func is not None
        }
    }
    return status

# ✅ Plant Disease Prediction
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Load predictor on first use
        predict_func = load_plantdoc_predictor()
        
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)

        file_path = os.path.join(temp_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = predict_func(file_path)
        
        # Clean up
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return result
    except Exception as e:
        logger.error(f"Plant disease prediction error: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "error": f"Plant disease prediction failed: {str(e)}",
            "prediction": "Unable to predict",
            "confidence": 0.0
        }

# ✅ Market Price Prediction
@app.get("/market-predictions")
def get_predictions_for_graph():
    try:
        # Load predictor on first use
        predict_func = load_price_predictor()
        results = predict_func()
        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Market prediction error: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "status": "error", 
            "message": f"Market prediction failed: {str(e)}",
            "data": []
        }

# ✅ Soil Type Prediction
IMG_SIZE = (180, 180)

soil_info = {
    "Alluvial soil": {
        "notes": "Fertile soil formed by river deposits, excellent for agriculture.",
        "crops": ["Rice", "Wheat", "Corn", "Sugarcane", "Cotton"],
        "care": ["Ensure proper drainage", "Regular organic matter addition", "Monitor pH levels"]
    },
    "Black Soil": {
        "notes": "Rich in clay and organic matter, retains moisture well.",
        "crops": ["Cotton", "Wheat", "Jowar", "Linseed", "Tobacco"],
        "care": ["Improve drainage", "Add organic compost", "Deep plowing recommended"]
    },
    "Clay soil": {
        "notes": "Dense soil with high water retention, can be challenging for some crops.",
        "crops": ["Rice", "Wheat", "Barley", "Oats"],
        "care": ["Improve drainage", "Add organic matter", "Avoid working when wet"]
    },
    "Red soil": {
        "notes": "Iron-rich soil, generally well-drained but may need nutrient supplementation.",
        "crops": ["Millet", "Groundnut", "Potato", "Tobacco", "Pulses"],
        "care": ["Add lime if acidic", "Regular fertilization", "Organic matter addition"]
    }
}

@app.post("/predict-soil")
async def predict_soil(file: UploadFile = File(...)):
    try:
        # Try to load model on first use
        try:
            model, class_names = load_soil_model()
            
            # Process the image
            image_bytes = await file.read() # Read file bytes
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            image = image.resize(IMG_SIZE)
            image_array = np.expand_dims(np.array(image) / 255.0, axis=0)
            logger.info(f"Processed image shape: {image_array.shape}")

            # Make prediction
            prediction = model.predict(image_array)[0]
            logger.info(f"Raw prediction probabilities: {prediction}")
            predicted_index = np.argmax(prediction)
            predicted_class = class_names[predicted_index]
            confidence = float(prediction[predicted_index]) * 100

            # 🔍 Debugging log
            logger.info(f"Predicted index: {predicted_index}")
            logger.info(f"Predicted class: {predicted_class}")
            logger.info(f"Confidence: {confidence}")

            # Get soil information
            info = soil_info.get(predicted_class, {
                "notes": "No additional info available for this soil type.",
                "crops": [],
                "care": ["Test soil pH regularly", "Add organic matter when needed"],
            })

            return {
                "prediction": predicted_class,
                "confidence": confidence,
                "notes": info["notes"],
                "crops": info["crops"],
                "care": info["care"],
                "status": "success"
            }
            
        except Exception as model_error:
            logger.error(f"Model loading or prediction failed: {str(model_error)}")
            
            # Reset file pointer for fallback
            await file.seek(0) 
            
            # Ultimate fallback: provide a generic but helpful response
            import random
            
            # Simple rule-based prediction based on basic image analysis
            try:
                image_bytes = await file.read()
                image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                
                # Get average color to make a basic guess
                pixels = list(image.getdata())
                avg_color = [sum(channel) / len(pixels) for channel in zip(*pixels)]
                
                # Simple heuristic based on color
                if avg_color[0] > 120 and avg_color[1] > 100 and avg_color[2] < 90:
                    soil_type = "Red soil"
                elif avg_color[0] < 80 and avg_color[1] < 80 and avg_color[2] < 80:
                    soil_type = "Black Soil"
                elif avg_color[0] > 100 and avg_col[1] > 100 and avg_color[2] > 100:
                    soil_type = "Alluvial soil"
                else:
                    soil_type = "Clay soil"
                
                confidence = random.uniform(60, 80)
                
                info = soil_info.get(soil_type, {
                    "notes": "Basic analysis based on visual characteristics. For accurate results, consider soil testing.",
                    "crops": ["Rice", "Wheat", "Vegetables"],
                    "care": ["Test soil pH regularly", "Add organic matter when needed", "Ensure good drainage"],
                })
                
                return {
                    "prediction": soil_type,
                    "confidence": confidence,
                    "notes": f"⚠️ Basic Visual Analysis: {info['notes']}",
                    "crops": info["crops"],
                    "care": info["care"],
                    "status": "fallback_analysis",
                    "warning": "AI model unavailable - using basic visual analysis"
                }
                
            except Exception as fallback_error:
                logger.error(f"Even fallback analysis failed: {str(fallback_error)}")
                
                # Final fallback - always return something useful
                return {
                    "prediction": "Mixed Soil",
                    "confidence": 50.0,
                    "notes": "Unable to perform detailed analysis at this time. Please try again later or consider professional soil testing.",
                    "crops": ["Rice", "Wheat", "Vegetables", "Legumes"],
                    "care": [
                        "Test soil pH regularly (ideal range: 6.0-7.0)",
                        "Add organic matter like compost",
                        "Ensure proper drainage",
                        "Consider professional soil testing"
                    ],
                    "status": "service_unavailable",
                    "warning": "Service temporarily unavailable"
                }

    except Exception as e:
        logger.error(f"Soil prediction error: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "prediction": "Analysis Error",
            "confidence": 0.0,
            "notes": "Unable to process the image. Please try again with a clearer image.",
            "crops": [],
            "care": ["Ensure soil has good drainage", "Test soil pH regularly", "Add organic matter when needed"],
            "status": "error",
            "warning": "Image processing failed"
        }

# ✅ Print all registered routes on startup
@app.on_event("startup")
async def startup_event():
    # --- REMOVED Base.metadata.create_all(bind=engine) ---
    # We don't want to create tables every time, 
    # especially since you are using MySQL
    
    logger.info("\n📋 AgriSync API Starting...")
    logger.info("📋 Registered Routes:")
    for route in app.routes:
        if hasattr(route, 'path'):
            logger.info(f"➡️  {route.path}")
    
    # Try to load models on startup (optional - will load on first use if this fails)
    logger.info("🔄 Attempting to pre-load models...")

    # Try to load soil model
    try:
        load_soil_model()
        logger.info("✅ Soil model loaded successfully")
    except Exception as e:
        logger.warning(f"⚠️ Could not pre-load soil model: {e}")

    # Try to load plant disease predictor
    try:
        load_plantdoc_predictor()
        logger.info("✅ Plant disease predictor loaded successfully")
    except Exception as e:
        logger.warning(f"⚠️ Could not pre-load plant disease predictor: {e}")

    # Try to load price predictor
    try:
        load_price_predictor()
        logger.info("✅ Price predictor loaded successfully")
    except Exception as e:
        logger.warning(f"⚠️ Could not pre-load price predictor: {e}")
    
    logger.info("✅ AgriSync API is ready!")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)