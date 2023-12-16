const textData = require("../fixtures/loginData.json");

describe("login_tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl") + "/login");
  });

  textData.forEach((item, index) => {
    it("input_data", () => {
      cy.inputText('input[name="username"]', item.username);
      cy.inputText('input[name="password"]', item.newPassword);

      cy.clickButton('button[type="submit"]');
      cy.elementExist('h2[id="task-heading"]');
      cy.log(`тест номер ${index + 1}`);
    });
  });
});
