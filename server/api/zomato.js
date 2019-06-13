const axios = require('axios')
module.exports = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    headers: { 'user-key': '15d18ce61342ad7fb8ca6398832fe5e8' }
})