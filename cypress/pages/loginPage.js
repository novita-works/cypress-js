class LoginPage {
    visit() {
      cy.visit('/customer/account/login/') 
    }
  
    enterEmail(email) {
      cy.get('#email').clear().type(email)
    }
  
    enterPassword(password) {
      cy.get('#pass').clear().type(password)
    }
  
    clickLoginButton() {
      cy.get('#send2').click()
    }
  
    verifyPageTitle() {
      cy.title().should('eq', 'Customer Login')
    }
}
export default LoginPage
