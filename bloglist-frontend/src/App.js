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
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage('you added a new blog: ')
    setTimeout(() => {
      setSuccessMessage(false)
    }, 5000)
  }

  const deleteBlog = async (idToDelete) => {
    const blogToDelete = blogs.find(blog => blog.id === idToDelete)
    if (blogToDelete.user.username === user.username) {
      const ok = window.confirm(`Delete blog: ${blogToDelete.title}?`)
      if (ok) {
        await blogService.deleteOne(idToDelete)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      } else {
        return
      }
    } else {
      window.alert('Only the creator of the blog can delete it')
    }
  }

  const findNewestBlog = (blogArray) => {
    return blogArray.filter((blog, index) =>  index === blogs.length - 1)
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
      <div style={{ border: '2px solid green', fontSize: '1.5rem' }}>
        <span>
          {successMessage}
        </span>
        {findNewestBlog(blogs).map(blog => <span key={blog.id}>{blog.title} {blog.author}</span>)}
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
        {blogs
          .sort((a, b ) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} update={updateExistingBlog} username={user.username}/>)}
      </>
    )
  }

  const renderLoggedInPage = () => {
    return (
      <div>
        <p>{user.username} logged in </p>
        <button className="logout-button" onClick={logUserOut}>logout</button>
        {successMessage && getSuccessMessage()}
        {renderAddNewBlogForm()}
        {renderBlogList(blogs)}
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

  const updateExistingBlog = async (idToUpdate) => {
    const blogToUpdate = blogs.find(blog => blog.id === idToUpdate)
    const newBlog = {
      author: blogToUpdate.author,
      likes: blogToUpdate.likes + 1,
      title: blogToUpdate.title,
      url: blogToUpdate.url,
      user: blogToUpdate.user.id,
    }
    const returnedUpdatedBlog = await blogService.updateOne(newBlog, blogToUpdate.id)
    setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : returnedUpdatedBlog))
  }

  if (!user) {
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