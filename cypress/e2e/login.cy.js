// const textData = require("../fixtures/loginData.json");
const loginPageElements = require("../fixtures/loginPage.json");

describe("login_tests", () => {
  it("input_data", () => {
    cy.fixture("loginData.json").then((textData) => {
      textData.forEach((item, index) => {
        cy.visit(Cypress.config("baseUrl") + "/login");
        cy.inputText('input[name="username"]', item.username);
        cy.inputText('input[name="password"]', item.newPassword);
        cy.clickButton('button[type="submit"]').then(() => {
          if (item.enter) {
            cy.get(":nth-child(1) > h3", { timeout: 4000 }).should(
              "be.visible"
            );
            cy.clickButton(loginPageElements.navMenu);
            cy.clickButton(loginPageElements.navMenuLogOut);
          } else {
            cy.get(":nth-child(1) > h3", { timeout: 4000 }).should("not.exist");
          }
          cy.log(`тест номер ${index + 1}`);
        });
      });
    });
  });
});
