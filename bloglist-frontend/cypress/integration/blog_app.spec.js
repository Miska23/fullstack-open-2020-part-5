describe('Blog app', function() {

  //* reset and create two users
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ name: 'Miska Linden', username: 'Miska23', password: 'miska_scrt' })
    cy.createUser({ name: 'Another User', username: 'User99', password: 'default' })
  })

  describe('Before user logs in ', function() {

    it('login header is shown', function() {
      cy.contains('Login to application')
    })

    it('login form exists', function() {
      cy.get('#form-login')
    })
  })

  describe('Logging in via UI', function() {

    it('succeeds with valid credentials', function() {
      cy.get('input[name="username"]')
        .type('Miska23')
      cy.get('input[name="password"]')
        .type('miska_scrt')
      cy.get('button')
        .click()
      cy.contains('Miska23 logged in').should('be.visible')
    })

    it('fails with invalid credentials', function() {
      cy.get('input[name="username"]')
        .type('Miska23')
      cy.get('input[name="password"]')
        .type('misk_scrt')
      cy.get('button')
        .click()
      cy.contains('wrong credentials')
        .should('be.visible')
        .parent('div')
        .should('have.css', 'border', '2px solid rgb(255, 0, 0)')
      cy.contains('Miska23 logged in')
        .should('not.exist')
    })

  })

  describe('After logging in via backend', function() {
    //* login
    beforeEach(function() {
      cy.login({ username: 'Miska23', password: 'miska_scrt' })
    })

    it('A new blog can be created via UI', function() {
      cy.contains('Add a new blog')
        .click()
      cy.get('#input-title')
        .type('Learn to test with cypress')
      cy.get('#input-author')
        .type('Cypress master')
      cy.get('#input-url')
        .type('www.cypressmasters.com')
      cy.get('#button-add-blog')
        .click()
      cy.get('.blog')
        .should('contain','Learn to test with cypress Cypress master')
    })
  })

  describe.only('After creating a new blog via backend', function() {

    //* login
    beforeEach(function() {
      cy.login({ username: 'Miska23', password: 'miska_scrt' })
    })

    //* create a new blog
    beforeEach(function() {
      cy.createBlog({
        author: 'Cypress master',
        title: 'Learn to test with cypress',
        url: 'www.cypressmasters.com'
      })
    })

    it('New blog can be viewed', function() {
      cy.get('.blog')
        .should('contain','Learn to test with cypress Cypress master')
    })

    it('New blog can be given a like', function() {
      cy.get('.expand-button')
        .click()
      cy.get('.like-button')
        .click()
      cy.contains('Likes: 1')
    })

    it('New blog can be deleted by the user who created it', function() {
      cy.get('.expand-button')
        .click()
      cy.get('.delete-button')
        .click()
      cy.get('html').should('not.contain', 'Learn to test with cypress Cypress master')
    })
  })

  describe('Trying to delete a blog created by another user', function() {

    //* login with first user
    beforeEach(function() {
      cy.login({ username: 'Miska23', password: 'miska_scrt' })
    })

    //* create a new blog with first user
    beforeEach(function() {
      cy.createBlog({
        author: 'Cypress master',
        title: 'Learn to test with cypress',
        url: 'www.cypressmasters.com'
      })
    })

    //* logout with first user
    beforeEach(function() {
      cy.logout()
    })

    //* login with second user
    beforeEach(function() {
      cy.login({ username: 'User99', password: 'default' })
    })

    it('Does not succeed', function() {
      cy.get('.expand-button')
        .click()
      cy.get('html').should('not.contain', '.delete-button')
    })
  })

  describe('After creating multiple blogs via backend and giving them likes via UI', function() {

    //* login
    beforeEach(function() {
      cy.login({ username: 'Miska23', password: 'miska_scrt' })
    })

    //* create new blogs
    beforeEach(function() {
      cy.createBlog({
        author: 'Cypress master',
        title: 'Learn to test with cypress',
        url: 'www.cypressmasters.com'
      })
      cy.createBlog({
        author: 'Mocha master',
        title: 'Learn to test with mocha',
        url: 'www.mochamasters.com'
      })
      cy.createBlog({
        author: 'Selenium master',
        title: 'Learn to test with selenium',
        url: 'www.seleniummasters.com'
      })
    })

    //* give likes to blogs
    beforeEach(function() {
      cy.addLikeInUI('Learn to test with cypress', 2)
      cy.addLikeInUI('Learn to test with mocha', 3)
      cy.addLikeInUI('Learn to test with selenium', 1)
    })

    it('Blogs are ordered on the basis of number of likes', function() {
      cy.get('.expand-button')
        .click({ multiple: true })
      cy.get('.blog-expanded').then(($blogs) => {
        expect($blogs[0]).to.contain('Likes: 3')
        expect($blogs[1]).to.contain('Likes: 2')
        expect($blogs[2]).to.contain('Likes: 1')
      })
    })
  })
})
