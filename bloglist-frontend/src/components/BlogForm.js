import React, { useState } from 'react'
import PropTypes from 'prop-types'



const BlogForm = (props) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    props.createNewBlog({ author, title, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form id="form-blog" onSubmit={addNewBlog}>
      <div>Title
        <input
          id="input-title"
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>Author
        <input
          id="input-author"
          type="text"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)} />
      </div>
      <div>URL
        <input
          id="input-url"
          type="text"
          name="URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)} />
      </div>
      <button type="submit">add a new blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm


