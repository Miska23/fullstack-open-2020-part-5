import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, deleteBlog, update, username }) => {

  const [expandedView, setExpandedView] = useState(false)


  let blogs
  if (expandedView) {
    blogs = (
      <div className="blog-expanded">
        <ul style={{ listStyle: 'none' }}>
          <li>
            {blog.title}
          </li>
          <li>
            {blog.author}
          </li>
          <li>
            {blog.url}
          </li>
          <li className="likes-container">
            Likes: {blog.likes}
            <button className="like-button" onClick={() => update(blog.id)}>like</button>
          </li>
          <li>
            {blog.user.username === username && <button className="delete-button" onClick={() => deleteBlog(blog.id)}>remove</button>}
          </li>
        </ul>
      </div>
    )
  } else {
    blogs = (
      <div className="blog">
        {blog.title} {blog.author}
      </div>
    )
  }

  return (
    <div>
      <button className="expand-button" key={blog.id} onClick={() => setExpandedView(!expandedView)} >{expandedView ? 'hide' : 'view'} </button>
      {blogs}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}


export default Blog
