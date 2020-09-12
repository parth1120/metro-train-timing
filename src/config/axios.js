import axios from 'axios'

const instance = axios.create({
    //baseURL
    baseURL: 'http://staging.watsoo.com:8080/watsoo-amazon-api/'
})

export default instance;