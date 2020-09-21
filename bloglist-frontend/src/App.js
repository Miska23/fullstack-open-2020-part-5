import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import AddNewBlogForm from './components/AddNewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await blogService.getAll();
      console.log("response: ", response);
      setBlogs(response)
    }
    fetchData()
  }, [])

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const loginResponse = await loginService.login({
          username, password,
        })
        setUser(loginResponse.name)
        saveTokenToLocalStorage(loginResponse.token)
        console.log('blogAppToken: ', localStorage.getItem('blogAppToken')); 
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    const saveTokenToLocalStorage = (token) => {
      localStorage.setItem('blogAppToken', token);
    }

    const logUserOut = () => {
      localStorage.removeItem('blogAppToken')
      setUser('')
    }

    const renderAddNewBlogForm = () => {
      return (
        <AddNewBlogForm />
      )
    }

  if (!user) {
    return (
      <div>
        <h2>
          Login to application
        </h2>
        <Form 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    )
  } else {
    return (
    <div>
      <p>{user} logged in </p>
      <button onClick={logUserOut}>logout</button>
      {renderAddNewBlogForm()}
      <h2>blogs</h2>
    {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
    </div>
    )
  }
}

export default App