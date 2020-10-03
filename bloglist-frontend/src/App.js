import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    fetchData()
  }, [])

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.addNew(blogObject)
    //! ruudulla näkyvät blogit päivittyvät vain koska stateen asetetaan uusi blogi,
    //! lisäyksen jälkeen ei siis haeta uudelleen kaikkia blogeja
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage('you added a new blog: ')
    setTimeout(() => {
      setSuccessMessage(false)
    }, 5000)
  }

  const findNewestBlog = (blogArray) => {
    const length = blogs.length
    return blogArray
      .filter((blog, index) =>  index === length - 1)
      .map(blog => <Blog key={blog.id} blog={blog} />)
  }

  const getErrorMessage = () => {
    return (
      <div style={{ border: '2px solid red' }}>
        <span style={{ fontSize: '1.5rem' }}>
          {errorMessage}
        </span>
      </div>
    )
  }

  //TODO: format styling (<Blog/> always renders a wrapping div for a single blog )
  const getSuccessMessage = () => {
    return (
      <div style={{ border: '2px solid green' }}>
        <span style={{ fontSize: '1.5rem' }}>
          {successMessage}
          {findNewestBlog(blogs)}
        </span>
      </div>
    )
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logUserOut = () => {
    window.localStorage.removeItem('loggedInuser')
    setUser('')
  }

  const renderAddNewBlogForm = () => {
    return (
      <Togglable
        buttonLabel="Add a new blog"
        ref={blogFormRef}
      >
        <BlogForm
          createNewBlog={createNewBlog}
        />
      </Togglable>
    )
  }

  const renderBlogList = (blogs) => {
    return (
      <>
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </>
    )

  }

  const renderLoggedInPage = () => {
    return (
      <div>
        <p>{user.username} logged in </p>
        {successMessage && getSuccessMessage()}
        {renderAddNewBlogForm()}
        {/* Lisää yksittäiselle blogille nappi, jonka avulla voi kontrolloida
        näytetäänkö kaikki blogiin liittyvät tiedot.
        Klikkaamalla nappia sen täydelliset tiedot aukeavat. */
        }
        {renderBlogList(blogs)}
        <button onClick={logUserOut}>logout</button>
      </div>
    )
  }

  const renderLoginPage = () => {
    return (
      <div>
        <h2>
          Login to application
        </h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        {errorMessage && getErrorMessage()}
      </div>
    )
  }

  const updateExistingBlog = async (blogObject) => {
    const updatedReturnedBlog = await blogService.updateOne(blogObject)
    //* state tulee päivittää päivitysoperaation onnistuttua jota liket näkyvä ruudulla
    // setBlogs(blogs.concat(returnedBlog))
  }

  if (!user) {
    console.log('[Miska], blogFormRef: ', blogFormRef)
    return (
      renderLoginPage()
    )
  } else {
    return (
      renderLoggedInPage()

    )
  }
}

export default App