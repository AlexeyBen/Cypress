const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://web2.0calc.com/',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
