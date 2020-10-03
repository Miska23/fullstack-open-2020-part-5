import React, { useState } from 'react'

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
    <form onSubmit={addNewBlog}>
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

export default BlogForm
