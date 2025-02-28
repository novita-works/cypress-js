import LoginPage from '../../pages/loginPage'
import '../../support/commands'

const loginPage = new LoginPage()

describe('Verify Login Functionality', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('Login with Valid Credentials', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      cy.login(user)
      cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
      cy.get('.box-content')
      .should('contain','Eleven Team','tim11@yopmail.com')
    })
  })

  it('Login with Invalid Format Email', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      user.email = user.invalidEmail
      cy.login(user)
      cy.wait(3000)
      cy.get('.mage-error')
      .should('have.text', 'Please enter a valid email address (Ex: johndoe@domain.com).')
    })
  })

  it('Login with Invalid Password', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      user.password = user.invalidPassword
      cy.login(user)
      cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
      .should('contain', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    })
  })

  it('Login With Mismatch Credentials ', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
        user.password = user.mismatchPassword
        cy.login(user)
      cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
      .should('contain','The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    })
})

  it('Login with Empty Credentials', () => {
    loginPage.verifyPageTitle()
    cy.get('#email').clear()
    cy.get('#pass').clear()
    cy.get('#send2').click()
    cy.wait(3000) 
    cy.get('#email-error')
    .should('be.visible').and('have.text', 'This is a required field.')
    cy.wait(3000) 
    cy.get('#pass-error')
    .should('be.visible').and('have.text', 'This is a required field.')
  })
})