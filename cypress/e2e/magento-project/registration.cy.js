import RegistrationPage from '../../pages/registrationPage'
import '../../support/commands'
const registrationPage = new RegistrationPage()

// Function for generate random user data
function generateRandomUserData() {
    const randomString = Math.random().toString(36).substring(2, 8)
    const userData = {
        firstname: `First${randomString}`,
        lastname: `Last${randomString}`,
        email: `test${randomString}@example.com`,
        password: `Password123!`
    };
    
    cy.log('Generated User Data:', userData)
    return userData;
}

describe('Verify Registration Functionallity', () => {
    beforeEach(() => {
      registrationPage.visit()
    })

    // it('Create an Account With Valid Data', () => {
    //     registrationPage.clickCreateAccount()
    //     registrationPage.verifyPageTitle()
    //     cy.fixture('user').then((user) => {
    //         cy.registerUser(user)
    //         cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
    //         cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should('have.text', 'Thank you for registering with Main Website Store.')
    //     })
    // })    

    it('Create an Account With Valid Data (Random)', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        const user = generateRandomUserData()
            cy.registerUser(user)
            cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
            cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .should('have.text', 'Thank you for registering with Main Website Store.')
    })

    it('Create an Account With First Name More Than Required Characters', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            const randomString = Math.random().toString(36).substring(2, 8)
            const randomEmail = `test${randomString}@example.com`
            user.firstname = user.longName
            user.email = randomEmail
            cy.registerUser(user)
            cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .should('have.text','First Name is not valid!')
        })
    })

    it('Create an Account With Last Name More Than Required Characters', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            const randomString = Math.random().toString(36).substring(2, 8)
            const randomEmail = `test${randomString}@example.com`
            user.lastname = user.longName
            user.email = randomEmail
            cy.registerUser(user)
            cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .should('have.text','Last Name is not valid!')
        })
    })
 
    it('Create an Account With Invalid Format Email', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.email = user.invalidEmail
            cy.registerUser(user)
            cy.get('#email_address-error')
            .should('have.text','Please enter a valid email address (Ex: johndoe@domain.com).')
        })
    })

    it('Create An Account with Existing Email', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.email = user.email
            cy.registerUser(user)
            cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .should('contain', 'There is already an account with this email address. If you are sure that it is your email address,');
        }) 
    })

    it('Create an Account With Invalid Format Password', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.password = user.invalidPassword
            cy.registerUser(user)
            cy.get('#password-error')
            .should('have.text','Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
        })
    })

    it('Create an Account With Password That Begins or Ends with Space', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.password = ' Password123! '
            cy.registerUser(user)
            cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .should('contain','Verify the password and try again.')
        })
    })

    it('Create an Account With Mismatch Password and Confirm Password', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            cy.get('#password-confirmation').type('Password123!')
            cy.registerUser(user)
            cy.get('#password-confirmation-error')
            .should('have.text','Please enter the same value again.')
        })
    })

    it('Create an Account With Password More Than Required Characters', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.password = user.longPassword
            cy.registerUser(user)
            cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .should('have.text','Please enter a password with at most 256 characters.')
        })
    })

    it('Create an Account With Empty Required Data', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.get('#firstname').clear()
        cy.get('#lastname').clear()
        cy.get('#email_address').clear()
        cy.get('#password').clear()
        cy.get('#password-confirmation').clear()
        cy.get('.action.submit.primary').click()
        cy.get('#firstname-error').should('have.text','This is a required field.')
        cy.get('#lastname-error').should('have.text','This is a required field.')
        cy.get('#email_address-error').should('have.text','This is a required field.')
        cy.get('#password-error').should('have.text','This is a required field.')
    })
})