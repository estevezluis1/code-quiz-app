import questions from '../../../src/assets/questions.json'

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Quiz 1 - HTML / CSS / JS Practice')
    
    questions.forEach((question) => {
      cy.get('.card-body > span').contains(question.question)
    })

    cy.get('button').click()

    cy.get('div.border-warning').should('have.length', questions.length)
  })
})
