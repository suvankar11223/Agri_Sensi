"""
AgriSync Database Models and Connection
SQLite database setup with SQLAlchemy
"""
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

# Database setup - MySQL for production
# DATABASE_URL = "sqlite:///./agrisync.db"  # For development
DATABASE_URL = "mysql+pymysql://root:babu1234@localhost/agrisync"  # For MySQL production
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Database Models

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    market_predictions = relationship("MarketPrediction", back_populates="user")
    soil_predictions = relationship("SoilPrediction", back_populates="user")
    plant_disease_predictions = relationship("PlantDiseasePrediction", back_populates="user")
    uploaded_images = relationship("UploadedImage", back_populates="user")

class MarketPrediction(Base):
    __tablename__ = "market_predictions"

    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String, index=True)
    date = Column(DateTime)
    predicted_price = Column(Float)
    unit = Column(String)  # Rs./Kg, Rs./Dozen, etc.
    confidence = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="market_predictions")

class SoilPrediction(Base):
    __tablename__ = "soil_predictions"

    id = Column(Integer, primary_key=True, index=True)
    soil_type = Column(String, index=True)
    confidence = Column(Float)
    crops = Column(Text)  # JSON string of recommended crops
    care_tips = Column(Text)  # JSON string of care instructions
    notes = Column(Text)
    image_path = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="soil_predictions")

class PlantDiseasePrediction(Base):
    __tablename__ = "plant_disease_predictions"

    id = Column(Integer, primary_key=True, index=True)
    disease_class = Column(String, index=True)
    confidence = Column(Float)
    health_status = Column(String)  # HEALTHY or DISEASED
    image_path = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="plant_disease_predictions")

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float)
    humidity = Column(Float)
    location = Column(String, default="Default Location")
    timestamp = Column(DateTime, default=datetime.utcnow)

class UploadedImage(Base):
    __tablename__ = "uploaded_images"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    prediction_type = Column(String)  # soil, plant_disease, etc.
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="uploaded_images")

class StorageSlot(Base):
    __tablename__ = "storage_slots"

    id = Column(Integer, primary_key=True, index=True)
    farmer_address = Column(String, index=True)
    capacity = Column(Float)  # in GB
    available_space = Column(Float)  # in GB
    blockchain_tx_hash = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    prediction_type = Column(String, index=True)  # market, soil, plant_disease
    input_data = Column(Text)  # JSON string of input parameters
    result_data = Column(Text)  # JSON string of prediction results
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")

# Initialize database
def init_database():
    """Initialize the database and create tables if they don't exist"""
    try:
        create_tables()
        print("✅ Database initialized successfully")
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        raise e

if __name__ == "__main__":
    init_database()
