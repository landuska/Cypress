export class LoginPage {
  elements = {
    loginField: () => cy.get('input[name="username"]'),
    passwordField: () => cy.get('input[name="password"]'),
    button: () => cy.get('button[type="submit"]'),
  };

  login(userName, password) {
    this.elements.loginField().type(userName);
    this.elements.passwordField().type(password);
    this.elements.button().click({ force: true });
  }
}
