const apiCall = (process.env.NODE_ENV === 'development') ? 'http://localhost:8000/api' : 'http://muavesoonline.com/api'
export default apiCall