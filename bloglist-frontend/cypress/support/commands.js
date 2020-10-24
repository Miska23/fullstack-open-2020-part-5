Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    name, username, password
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('logout', () => {
  cy.get('.logout-button').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addLikeInUI', (blogTitleToFind, numberOfLikes) => {
  cy.contains(blogTitleToFind)
    .parent()
    .find('.expand-button')
    .click()
  for (let i = 0; i < numberOfLikes; i++) {
    cy.contains('like')
      .click()
  }
  cy.contains(blogTitleToFind)
    .parent()
    .parent()
    .parent()
    .find('.expand-button')
    .click()
})

