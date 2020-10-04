import React, { useState } from 'react'

const Blog = ({ blog, update }) => {

  const [expandedView, setExpandedView] = useState(false)

  /*   <button key={blog.id} onClick={() => setExpandedView(!expandedView)} >{expandedView ? 'hide' : 'view'} </button>
  <Blog blog={blog} expandedView={expandedView}/>
 */
  let blogs
  if (expandedView) {
    blogs = (
      <div>
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
          <li>
            Likes: {blog.likes}
            <button onClick={() => update(blog.id)}>like</button>
          </li>
        </ul>
      </div>
    )
  } else {
    blogs = (
      <div>
        {blog.title} {blog.author}
      </div>
    )
  }

  return (
    <div>
      <button key={blog.id} onClick={() => setExpandedView(!expandedView)} >{expandedView ? 'hide' : 'view'} </button>
      {blogs}
    </div>
  )
}


export default Blog
