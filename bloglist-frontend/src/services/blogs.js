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

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const updateOne = async (blogObject, id) => {
  //* lähetä PUTissa baseUrl ja blog. Autentikointia ei tarvita!
  //* blog-olion tulee sisältää kaikki tietokantaan tallennetut tiedot (myös user-id joka viittaa blogin lisänneeseen käyttäjään)
  //* ja blogin id joka haetaan frontissa statessa olevasta listasta
  const request = await axios.put(`${baseUrl}/${id}`, blogObject)
  console.log('[Miska], request: ', request)
  return request.data
}

export default { addNew, getAll, setToken, updateOne }