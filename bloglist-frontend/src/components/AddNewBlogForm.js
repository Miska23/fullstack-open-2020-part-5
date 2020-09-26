import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddNewBlogForm = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('blogAppToken')
  }

  const handleAddNewBlog = (event) => {
    event.preventDefault()
    blogService.addNew({ title, author, url }, getTokenFromLocalStorage())
  }

  return (
    <form onSubmit={(event) => handleAddNewBlog(event)}>
      <div>Title
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>Author
        <input
          type="text"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)} />
      </div>
      <div>URL
        <input
          type="text"
          name="URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)} />
      </div>
      <button type="submit">add a new blog</button>
    </form>
  )
}

export default AddNewBlogForm
