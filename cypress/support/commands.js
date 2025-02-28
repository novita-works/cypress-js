// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to register new account with static data 
Cypress.Commands.add('registerUser', (user) => {
    cy.get('#firstname').type(user.firstname)
    cy.get('#lastname').type(user.lastname)
    cy.get('#email_address').type(user.email)
    cy.get('#password').type(user.password)
    cy.get('#password-confirmation').type(user.password)
    cy.get('.action.submit.primary').click()
})

// Custom command to login with valid data 
Cypress.Commands.add('login', (user) => {
    cy.get('#email').type(user.email)
    cy.get('#pass').type(user.password)
    cy.get('#send2').click()
})