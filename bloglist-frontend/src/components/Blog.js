import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [expandedView, setExpandedView] = useState(false)

  /*   <button key={blog.id} onClick={() => setExpandedView(!expandedView)} >{expandedView ? 'hide' : 'view'} </button>
  <Blog blog={blog} expandedView={expandedView}/>
 */
  let blogs
  if (expandedView) {
    blogs = (
      <div>
        {blog.title} {blog.author} {blog.url} Likes: {blog.likes}
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
