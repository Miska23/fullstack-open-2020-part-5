describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Miska Linden',
      username: 'Miska23',
      password: 'miska_scrt'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Before user logs in ', function() {

    it('login header is shown', function() {
      cy.contains('Login to application')
    })

    it('login form exists', function() {
      cy.get('#form-login')
    })
  })

  describe.only('Creating a new blog', function() {

    beforeEach(function() {
      cy.login({ username: 'Miska23', password: 'miska_scrt' })
    })
    beforeEach(function() {
      cy.createBlog({
        author: 'Cypress master',
        title: 'Learn to test with cypress',
        url: 'www.cypressmasters.com'
      })
    })


    /*     it('succeeds with valid credentials', function() {
      cy.get('input[name="username"]')
        .type('Miska23')
      cy.get('input[name="password"]')
        .type('miska_scrt')
      cy.get('button')
        .click()
      cy.contains('Miska23 logged in').should('be.visible')
    }) */

    /* it('fails with invalid credentials', function() {
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
        .should('not.exist')s
    }) */

    /*     it('A blog can be created', function() {
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
    }) */
    it('New blog can be viewed', function() {
      cy.get('.blog')
        .should('contain','Learn to test with cypress Cypress master')
    })

    it('New blog can be given a like', function() {
      cy.get('.expand-button')
        .click()
      //TODO: test liking in backend and read likes programmatically
      cy.get('.like-button')
        .click()
      cy.contains('Likes: 1')
    })
  })
})
