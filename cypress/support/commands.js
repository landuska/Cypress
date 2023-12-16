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

Cypress.Commands.add("clickButton", (selector) => {
  cy.get(selector).click({ force: true });
});

Cypress.Commands.add("elementExist", (selector) => {
  cy.get(selector).should("exist");
});

Cypress.Commands.add("firstElementWithThisClassClick", (selector) => {
  cy.get(selector).first().click();
});

Cypress.Commands.add("thirdElementWithThisClassClick", (selector) => {
  cy.get(selector).eq(2).click();
});

Cypress.Commands.add("lastElementWithThisClassClick", (selector) => {
  cy.get(selector).last().click();
});

Cypress.Commands.add("containsTextClick", (selector, text) => {
  cy.get(selector).contains(text).click();
});

Cypress.Commands.add("elementWithThisTextExist", (selector, words) => {
  cy.get(selector).should("include.text", words);
});

Cypress.Commands.add("inputText", (selector, words) => {
  cy.get(selector).type(words);
});
