import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addNew = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const deleteOne = async (id) => {

  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const updateOne = async (blog, id) => {
  const request = await axios.put(`${baseUrl}/${id}`, blog)
  return request.data
}

export default { addNew, deleteOne, getAll, setToken, updateOne }