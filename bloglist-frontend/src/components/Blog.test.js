import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title: 'All about testing',
  author: 'Joku kova koodaaja',
  url: 'www.kaikkikoodista.com',
  likes: '20',
  user: {
    username: 'Testaaja',
    name: 'Testi testinen',
  }
}
describe('<Blog />', () => {

  let component

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} update={mockHandler}/>
    )
  })

  test('renders content', () => {

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'All about testing'
    )
  })

  test('more information about a blog is displayed after clicking button once', async () => {

    const button = component.container.querySelector('.expand-button')

    fireEvent.click(button)

    const div = component.container.querySelector('.blog-expanded')
    expect(div).toHaveTextContent(
      'www.kaikkikoodista.com'
    )
    expect(div).toHaveTextContent(
      'Likes: 20'
    )
  })

  test('clicking "like" button twice calls the event handler twice', async () => {

    const expandButton = component.container.querySelector('.expand-button')

    fireEvent.click(expandButton)

    const likeButton = component.container.querySelector('.like-button')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

describe('<BlogForm /> ', () => {

  test('creates a new blog with given input', () => {
    const createNewBlog = jest.fn()

    const component = render(
      <BlogForm createNewBlog={createNewBlog} />
    )

    const titleInput = component.container.querySelector('#input-title')
    const authorInput = component.container.querySelector('#input-author')
    const urlInput = component.container.querySelector('#input-url')
    const form = component.container.querySelector('#form-blog')

    fireEvent.change(titleInput, {
      target: { value: 'Front end testing is difficult' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Test Tester' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'www.testers.com' }
    })
    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].author).toBe('Test Tester')
  })
})
