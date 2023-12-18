import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";
const loginPageElements = require("../fixtures/loginPage.json");

describe("login_tests_UI", () => {
  it("login", () => {
    let loginPage = new LoginPage();
    let userName = "landysh.kh";
    let oldPassword = "student";
    let newPassword = faker.internet.password(10);
    cy.log(newPassword);

    cy.visit(Cypress.config("baseUrl") + "/login");
    loginPage.login(userName, oldPassword);
    cy.elementExist(loginPageElements.elementForAssertion);

    cy.clickButton(loginPageElements.navMenu);
    cy.clickButton(loginPageElements.navMenuPassword);
    cy.inputText(loginPageElements.currentPasswordField, oldPassword);
    cy.inputText(loginPageElements.newPasswordField, newPassword);
    cy.inputText(loginPageElements.confirmPasswordField, newPassword);
    cy.clickButton(loginPageElements.button);

    cy.clickButton(loginPageElements.navMenu);
    cy.clickButton(loginPageElements.navMenuLogOut);

    cy.visit(Cypress.config("baseUrl") + "/login");
    cy.inputText(loginPageElements.loginField, userName);
    cy.inputText(loginPageElements.passwordField, oldPassword);
    cy.clickButton(loginPageElements.button);
    cy.elementExist('[data-cy="loginError"]');

    cy.get(loginPageElements.passwordField).clear().type(newPassword);
    cy.clickButton(loginPageElements.button);
    cy.elementExist(loginPageElements.elementForAssertion);

    cy.clickButton(loginPageElements.navMenu);
    cy.clickButton(loginPageElements.navMenuPassword);
    cy.inputText(loginPageElements.currentPasswordField, newPassword);
    cy.inputText(loginPageElements.newPasswordField, oldPassword);
    cy.inputText(loginPageElements.confirmPasswordField, oldPassword);
    cy.clickButton(loginPageElements.button);
  });
});
