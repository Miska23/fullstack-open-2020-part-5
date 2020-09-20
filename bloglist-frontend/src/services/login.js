import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  //TODO: POSTIN bodyyn username ja password
  const request = axios.post(baseUrl)
  return request.then(response => response.data)
}

export default { login }