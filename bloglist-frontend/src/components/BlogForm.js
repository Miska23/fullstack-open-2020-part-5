import React from 'react'

const BlogForm = (props) => {

  return (
    <form onSubmit={(event) => props.handleAddNewBlog(event)}>
      <div>Title
        <input
          type="text"
          name="title"
          value={props.title}
          onChange={(event) => props.setTitle(event.target.value)} />
      </div>
      <div>Author
        <input
          type="text"
          name="author"
          value={props.author}
          onChange={(event) => props.setAuthor(event.target.value)} />
      </div>
      <div>URL
        <input
          type="text"
          name="URL"
          value={props.url}
          onChange={(event) => props.setUrl(event.target.value)} />
      </div>
      <button type="submit">add a new blog</button>
    </form>
  )
}

export default BlogForm
