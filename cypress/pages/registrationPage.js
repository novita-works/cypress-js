class RegistrationPage {
    visit() {
      cy.visit('/')
    }
  
    clickCreateAccount() {
      cy.contains('Create an Account').click()
    }
  
    verifyPageTitle() {
      cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', 'Create New Customer Account')
    }
  }
export default RegistrationPage