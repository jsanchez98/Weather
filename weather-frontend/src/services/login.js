import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
    console.log('LOGIN CALLED')
    const response = await axios.post(baseUrl, credentials)
    console.log('AXIOS RESPONSE', response)
    return response.data
}

export default {login}