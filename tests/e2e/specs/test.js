import questions from '../../../src/assets/questions.json'

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h2', 'Quiz 1 - HTML / CSS / JS Practice')
    
    questions.forEach((question) => {
      cy.contains('h4', question.question)
    })

    cy.get('button').click()

    cy.get('div.border-warning').should('have.length', questions.length)
  })
})
