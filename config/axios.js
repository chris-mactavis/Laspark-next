const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: process.env.environment === 'dev' ? 'http://laspark.test/api/v1/' : 'http://104.131.93.134/api/v1/',
    // baseURL: 'http://104.131.93.134/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': true
    }
});


export default axiosInstance;
