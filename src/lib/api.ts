import axios from 'axios'

const baseURL = window.location.hostname === 'localhost'
  ? 'https://outstanding-jaculiferous-anjanette.ngrok-free.dev/api'

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Skip ngrok warning
    'User-Agent': 'StarLit-App/1.0', // Custom user agent
  }
})

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout')
    }

    // Temporary debug logging: surface status / url for failing requests
    try {
      if (error.response) {
        console.error('API response error', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response.status,
          data: error.response.data
        })
      } else {
        console.error('API request error', error.message || error)
      }
    } catch (e) {
      console.error('Failed to log API error', e)
    }

    return Promise.reject(error)
  }
)
