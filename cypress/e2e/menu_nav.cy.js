before(() => {
  cy.log("ready, steady,go!");
});

after(() => {
  cy.log("Bye-bye!");
});

describe("herokuapp_tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl") + "/login");
    cy.get('input[name="username"]').type(Cypress.config("username"));
    cy.get('input[name="password"]').type(Cypress.config("password"));
    cy.clickButton('button[type="submit"]');
  });

  it("item_Home", () => {
    cy.clickButton('li[class="nav-item"]');
    cy.elementExist('h2[id="task-heading"]');
  });

  it("item_Entities_1", () => {
    cy.firstElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Task");
    cy.get('h2[id="task-heading"]')
      .find('button[type="button"]')
      .should("exist");
  });

  it("item_Entities_2", () => {
    cy.firstElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "User Task");
    cy.elementExist('h2[id="user-task-heading"]');
  });

  it("item_Swagger", () => {
    cy.get('li[class="dropdown nav-item"]').eq(1).click();
    cy.containsTextClick('li[class="dropdown show nav-item"]', "API");
    cy.elementWithThisTextExist(
      "span",
      "You are not authorized to access this page."
    );
  });

  it("item_English", () => {
    cy.thirdElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "English");
    cy.elementWithThisTextExist("span", "This is your footer");
  });

  it("item_French", () => {
    cy.thirdElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Français");
    cy.elementWithThisTextExist(
      "span",
      "Vous n'avez pas les droits pour accéder à cette page."
    );
  });

  it("item_Russian", () => {
    cy.thirdElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Русский");
    cy.elementWithThisTextExist("span", "Это ваш футтер");
  });

  it("item_Ukrainian", () => {
    cy.thirdElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Українська");
    cy.elementWithThisTextExist(
      "span",
      "Ви не авторизовані для доступу до цієї сторінки"
    );
  });

  it("item_Account_1", () => {
    cy.lastElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Settings");
    cy.elementExist('h2[id="settings-title"]');
  });

  it("item_Account_2", () => {
    cy.lastElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Password");
    cy.elementExist('h2[id="password-title"]');
  });

  it("item_Account_3", () => {
    cy.lastElementWithThisClassClick('li[class="dropdown nav-item"]');
    cy.containsTextClick('li[class="dropdown show nav-item"]', "Sign out");
    cy.elementWithThisTextExist("h4", "Logged out successfully!");
  });
});
