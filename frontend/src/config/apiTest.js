// API Test Utility
import axios from 'axios';
import { API_URL } from './api';

/**
 * Test the API connection and endpoints
 */
export const testApiConnection = async () => {
  const results = {
    baseUrl: API_URL,
    health: { status: 'testing', response: null, error: null },
    healthz: { status: 'testing', response: null, error: null },
    predict: { status: 'testing', response: null, error: null },
    marketPredictions: { status: 'testing', response: null, error: null },
    predictSoil: { status: 'testing', response: null, error: null }
  };

  console.log('🧪 Testing API connection to:', API_URL);

  // Test health endpoint
  try {
    const healthResponse = await axios.get(`${API_URL}/health`, { timeout: 5000 });
    results.health.status = 'success';
    results.health.response = healthResponse.data;
    console.log('✅ Health check passed:', healthResponse.data);
  } catch (error) {
    results.health.status = 'failed';
    results.health.error = error.message;
    console.error('❌ Health check failed:', error.message);
  }

  // Test detailed health endpoint
  try {
    const healthzResponse = await axios.get(`${API_URL}/healthz`, { timeout: 5000 });
    results.healthz.status = 'success';
    results.healthz.response = healthzResponse.data;
    console.log('✅ Detailed health check passed:', healthzResponse.data);
  } catch (error) {
    results.healthz.status = 'failed';
    results.healthz.error = error.message;
    console.error('❌ Detailed health check failed:', error.message);
  }

  // Test market predictions endpoint
  try {
    const marketResponse = await axios.get(`${API_URL}/market-predictions`, { timeout: 10000 });
    results.marketPredictions.status = 'success';
    results.marketPredictions.response = marketResponse.data;
    console.log('✅ Market predictions test passed:', marketResponse.data);
  } catch (error) {
    results.marketPredictions.status = 'failed';
    results.marketPredictions.error = error.message;
    console.error('❌ Market predictions test failed:', error.message);
  }

  // Test predict endpoint (GET request - should return method not allowed)
  try {
    const predictResponse = await axios.get(`${API_URL}/predict`, { timeout: 5000 });
    results.predict.status = 'unexpected_success';
    results.predict.response = predictResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 405) {
      results.predict.status = 'success';
      results.predict.response = 'Endpoint exists (405 Method Not Allowed is expected)';
      console.log('✅ Predict endpoint exists (405 expected for GET)');
    } else {
      results.predict.status = 'failed';
      results.predict.error = error.message;
      console.error('❌ Predict endpoint test failed:', error.message);
    }
  }

  // Test soil prediction endpoint (GET request - should return method not allowed)
  try {
    const soilResponse = await axios.get(`${API_URL}/predict-soil`, { timeout: 5000 });
    results.predictSoil.status = 'unexpected_success';
    results.predictSoil.response = soilResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 405) {
      results.predictSoil.status = 'success';
      results.predictSoil.response = 'Endpoint exists (405 Method Not Allowed is expected)';
      console.log('✅ Soil prediction endpoint exists (405 expected for GET)');
    } else {
      results.predictSoil.status = 'failed';
      results.predictSoil.error = error.message;
      console.error('❌ Soil prediction endpoint test failed:', error.message);
    }
  }

  console.log('🔍 API Test Results:', results);
  return results;
};

/**
 * Quick health check
 */
export const quickHealthCheck = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`, { timeout: 3000 });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Check if API is running
 */
export const isApiRunning = async () => {
  const health = await quickHealthCheck();
  return health.success;
};

const apiTestUtils = {
  testApiConnection,
  quickHealthCheck,
  isApiRunning
};

export default apiTestUtils;
