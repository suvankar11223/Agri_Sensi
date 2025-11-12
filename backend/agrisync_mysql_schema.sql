-- AgriSync Database Schema for MySQL Workbench
-- This file contains all the database tables for the AgriSync project
-- Run this script in MySQL Workbench to create the complete database schema

-- Create database
CREATE DATABASE IF NOT EXISTS agrisync;
USE agrisync;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Market predictions table
CREATE TABLE IF NOT EXISTS market_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    predicted_price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL COMMENT 'Rs./Kg, Rs./Dozen, etc.',
    confidence DECIMAL(5,4) NOT NULL COMMENT 'Confidence score between 0 and 1',
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_crop_name (crop_name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Soil predictions table
CREATE TABLE IF NOT EXISTS soil_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    soil_type VARCHAR(255) NOT NULL,
    confidence DECIMAL(5,4) NOT NULL COMMENT 'Confidence score between 0 and 1',
    crops TEXT COMMENT 'JSON string of recommended crops',
    care_tips TEXT COMMENT 'JSON string of care instructions',
    notes TEXT,
    image_path VARCHAR(500),
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_soil_type (soil_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Plant disease predictions table
CREATE TABLE IF NOT EXISTS plant_disease_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    disease_class VARCHAR(255) NOT NULL,
    confidence DECIMAL(5,4) NOT NULL COMMENT 'Confidence score between 0 and 1',
    health_status ENUM('HEALTHY', 'DISEASED') NOT NULL,
    image_path VARCHAR(500),
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_disease_class (disease_class),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Weather data table
CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature DECIMAL(5,2) NOT NULL COMMENT 'Temperature in Celsius',
    humidity DECIMAL(5,2) NOT NULL COMMENT 'Humidity percentage',
    location VARCHAR(255) DEFAULT 'Default Location',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_timestamp (timestamp)
);

-- Uploaded images table
CREATE TABLE IF NOT EXISTS uploaded_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    prediction_type VARCHAR(50) NOT NULL COMMENT 'soil, plant_disease, etc.',
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Storage slots table (for blockchain storage)
CREATE TABLE IF NOT EXISTS storage_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_address VARCHAR(255) NOT NULL,
    capacity DECIMAL(10,2) NOT NULL COMMENT 'Capacity in GB',
    available_space DECIMAL(10,2) NOT NULL COMMENT 'Available space in GB',
    blockchain_tx_hash VARCHAR(255) COMMENT 'Blockchain transaction hash',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_farmer_address (farmer_address)
);

-- Prediction history table (audit trail)
CREATE TABLE IF NOT EXISTS prediction_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prediction_type VARCHAR(50) NOT NULL COMMENT 'market, soil, plant_disease',
    input_data TEXT COMMENT 'JSON string of input parameters',
    result_data TEXT COMMENT 'JSON string of prediction results',
    user_id INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_prediction_type (prediction_type),
    INDEX idx_timestamp (timestamp),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Sample data insertion - seeding the database with initial data
INSERT INTO users (username, email) VALUES
('farmer1', 'farmer1@example.com'),
('farmer2', 'farmer2@example.com'),
('agri_expert', 'expert@agrisync.com'),
('researcher', 'research@university.edu'),
('admin', 'admin@agrisync.com');

INSERT INTO weather_data (temperature, humidity, location) VALUES
(25.5, 65.0, 'Farm Location 1'),
(28.0, 70.0, 'Farm Location 2'),
(22.3, 72.5, 'Green Valley Farm'),
(30.1, 55.2, 'Sunny Acres'),
(26.8, 68.9, 'River Bend Plantation'),
(24.7, 61.3, 'Mountain View Farm'),
(29.5, 58.7, 'Desert Oasis'),
(23.9, 74.1, 'Tropical Grove');

INSERT INTO market_predictions (crop_name, date, predicted_price, unit, confidence, user_id) VALUES
('Rice', '2024-01-15 10:00:00', 45.50, 'Rs./Kg', 0.85, 1),
('Wheat', '2024-01-15 10:00:00', 32.75, 'Rs./Kg', 0.78, 1),
('Corn', '2024-01-15 11:00:00', 28.90, 'Rs./Kg', 0.82, 2),
('Sugarcane', '2024-01-15 12:00:00', 35.20, 'Rs./Quintal', 0.88, 1),
('Cotton', '2024-01-15 13:00:00', 85.00, 'Rs./Kg', 0.91, 2),
('Soybean', '2024-01-15 14:00:00', 42.30, 'Rs./Kg', 0.79, 1),
('Potatoes', '2024-01-15 15:00:00', 18.50, 'Rs./Kg', 0.86, 2),
('Tomatoes', '2024-01-15 16:00:00', 25.75, 'Rs./Kg', 0.83, 1),
('Rice', '2024-01-16 10:00:00', 46.20, 'Rs./Kg', 0.87, 1),
('Wheat', '2024-01-16 10:00:00', 33.10, 'Rs./Kg', 0.80, 2);

INSERT INTO soil_predictions (soil_type, confidence, crops, care_tips, notes, user_id, image_path) VALUES
('Clay Soil', 0.92, '["Rice", "Sugarcane", "Wheat"]', '["Regular watering", "Add organic matter", "Avoid over-fertilization"]', 'Good for water-intensive crops, high nutrient retention', 1, '/uploads/soil_001.jpg'),
('Sandy Soil', 0.88, '["Carrots", "Potatoes", "Peanuts"]', '["Frequent irrigation", "Add compost", "Use mulch to retain moisture"]', 'Needs frequent nutrient supplementation, good drainage', 2, '/uploads/soil_002.jpg'),
('Loamy Soil', 0.95, '["Corn", "Soybean", "Vegetables"]', '["Balanced watering", "Regular fertilization", "Crop rotation"]', 'Ideal soil type, excellent for most crops', 1, '/uploads/soil_003.jpg'),
('Silt Soil', 0.89, '["Rice", "Wheat", "Barley"]', '["Controlled irrigation", "Add lime if acidic", "Prevent erosion"]', 'Good water retention, can be compacted', 2, '/uploads/soil_004.jpg'),
('Peaty Soil', 0.91, '["Potatoes", "Carrots", "Berries"]', '["Excellent drainage needed", "Add sand if too wet", "High organic matter"]', 'Very fertile but may be waterlogged', 1, '/uploads/soil_005.jpg'),
('Chalky Soil', 0.86, '["Grapes", "Lavender", "Raspberries"]', '["Add organic matter", "Avoid alkaline fertilizers", "Good drainage essential"]', 'Alkaline soil, can be drought-prone', 2, '/uploads/soil_006.jpg');

INSERT INTO plant_disease_predictions (disease_class, confidence, health_status, user_id, image_path) VALUES
('Leaf Blight', 0.94, 'DISEASED', 1, '/uploads/disease_001.jpg'),
('Healthy', 0.97, 'HEALTHY', 1, '/uploads/disease_002.jpg'),
('Powdery Mildew', 0.89, 'DISEASED', 2, '/uploads/disease_003.jpg'),
('Bacterial Spot', 0.92, 'DISEASED', 1, '/uploads/disease_004.jpg'),
('Healthy', 0.95, 'HEALTHY', 2, '/uploads/disease_005.jpg'),
('Fungal Infection', 0.87, 'DISEASED', 1, '/uploads/disease_006.jpg'),
('Nutrient Deficiency', 0.91, 'DISEASED', 2, '/uploads/disease_007.jpg'),
('Healthy', 0.98, 'HEALTHY', 1, '/uploads/disease_008.jpg'),
('Rust Disease', 0.93, 'DISEASED', 2, '/uploads/disease_009.jpg'),
('Healthy', 0.96, 'HEALTHY', 1, '/uploads/disease_010.jpg');

INSERT INTO storage_slots (farmer_address, capacity, available_space, blockchain_tx_hash) VALUES
('0x1234567890abcdef', 100.00, 75.50, '0xabcdef1234567890'),
('0xfedcba0987654321', 200.00, 180.25, '0x098765fedcba4321'),
('0xabcdef1234567890', 150.00, 120.75, '0x1234567890abcdef'),
('0x9876543210fedcba', 250.00, 200.00, '0xfedcba0987654321'),
('0x1111111111111111', 300.00, 250.50, '0x2222222222222222'),
('0xaaaaaaaaaaaaaaaa', 175.00, 150.25, '0xbbbbbbbbbbbbbbbb');

INSERT INTO uploaded_images (filename, file_path, prediction_type, user_id) VALUES
('soil_sample_001.jpg', '/uploads/soil_sample_001.jpg', 'soil', 1),
('plant_leaf_001.jpg', '/uploads/plant_leaf_001.jpg', 'plant_disease', 1),
('soil_sample_002.jpg', '/uploads/soil_sample_002.jpg', 'soil', 2),
('plant_stem_001.jpg', '/uploads/plant_stem_001.jpg', 'plant_disease', 2),
('field_image_001.jpg', '/uploads/field_image_001.jpg', 'soil', 1),
('leaf_closeup_001.jpg', '/uploads/leaf_closeup_001.jpg', 'plant_disease', 1),
('soil_texture_001.jpg', '/uploads/soil_texture_001.jpg', 'soil', 2),
('disease_symptoms_001.jpg', '/uploads/disease_symptoms_001.jpg', 'plant_disease', 2);

INSERT INTO prediction_history (prediction_type, input_data, result_data, user_id) VALUES
('market', '{"crop": "Rice", "location": "Farm Location 1"}', '{"predicted_price": 45.50, "confidence": 0.85}', 1),
('soil', '{"image_path": "/uploads/soil_001.jpg"}', '{"soil_type": "Clay Soil", "confidence": 0.92}', 1),
('plant_disease', '{"image_path": "/uploads/disease_001.jpg"}', '{"disease_class": "Leaf Blight", "confidence": 0.94}', 1),
('market', '{"crop": "Wheat", "location": "Farm Location 2"}', '{"predicted_price": 32.75, "confidence": 0.78}', 2),
('soil', '{"image_path": "/uploads/soil_002.jpg"}', '{"soil_type": "Sandy Soil", "confidence": 0.88}', 2),
('plant_disease', '{"image_path": "/uploads/disease_002.jpg"}', '{"disease_class": "Healthy", "confidence": 0.97}', 1),
('market', '{"crop": "Corn", "location": "Green Valley Farm"}', '{"predicted_price": 28.90, "confidence": 0.82}', 2),
('soil', '{"image_path": "/uploads/soil_003.jpg"}', '{"soil_type": "Loamy Soil", "confidence": 0.95}', 1),
('plant_disease', '{"image_path": "/uploads/disease_003.jpg"}', '{"disease_class": "Powdery Mildew", "confidence": 0.89}', 2),
('market', '{"crop": "Sugarcane", "location": "River Bend Plantation"}', '{"predicted_price": 35.20, "confidence": 0.88}', 1);

COMMIT;
