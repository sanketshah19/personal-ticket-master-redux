import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3006'
})

export default axios