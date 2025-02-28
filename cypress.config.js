const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // reporter: "cypress-mochawesome-reporter",
  // reporterOptions: {
  //   reportDir: "cypress/results",
  //   overwrite: false,
  //   html: true,
  //   json: false
  // },
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com',
    setupNodeEvents(on, config) {
      // require("cypress-mochawesome-reporter/plugin")(on)
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    screenshotOnRunFailure: false,
    retries: {
      runMode: 2,
      openMode: 1
    },
    chromeWebSecurity: false
  },
});