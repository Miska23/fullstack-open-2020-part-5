import axios from 'axios'

const baseUrl = '/api/blogs'

const addNew = async (blog, userToken) => {
  
  const token = `bearer ${userToken}`

  const config = {
    headers: { Authorization: token },
  }

  console.log('blog: ', blog);
  console.log('config: ', config);
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { addNew, getAll }