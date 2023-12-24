const textData = require("../fixtures/data_registration.json");

describe("register_tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl") + "/account/register");
  });

  textData.forEach((item, index) => {
    it("input_data", () => {
      cy.inputText('input[name="username"]', item.username);
      cy.inputText('input[name="email"]', item.email);
      cy.inputText('input[name="firstPassword"]', item.newPassword);
      cy.inputText(
        'input[name="secondPassword"]',
        item.newPasswordConfirmation
      );
      cy.clickButton('button[type="submit"]');
      cy.get(".invalid-feedback").should("not.exist");
      cy.log(`тест номер ${index + 1}`);
    });
  });
});
