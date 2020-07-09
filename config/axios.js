const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: process.env.environment === 'dev' ? 'http://laspark.test/api/v1/' : 'http://138.68.43.103/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});


export default axiosInstance;
