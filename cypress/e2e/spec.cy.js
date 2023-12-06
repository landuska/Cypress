describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://sqlverifier-live-6e21ca0ed768.herokuapp.com/')
  })
  it('element exist', () => {
  cy.get('.table-responsive').should('exist');
})
})