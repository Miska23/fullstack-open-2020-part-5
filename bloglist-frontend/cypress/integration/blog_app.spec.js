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

  it('Login from is shown', function() {
    cy.contains('Login to application')
  })

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  it('test that fails', function() {
    cy.visit('http://localhost:3000')
    cy.contains('does not exist')
  })
})