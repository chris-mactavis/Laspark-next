const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: process.env.environment === 'dev' ? 'http://laspark.test/api/v1/' : 'http://159.203.67.70/api/v1/',
    // baseURL: 'http://159.203.67.70/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
});


export default axiosInstance;
