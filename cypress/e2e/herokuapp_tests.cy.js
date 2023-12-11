describe("herokuapp_tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("user_teacher");
    cy.get('input[name="password"]').type("user");
    cy.get('button[type="submit"]').click();
    cy.url().should(
      "equal",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc"
    )
  });

    it("1 element", () => {
      cy.get('li[class="nav-item"]').click();
      cy.get('h2[id="task-heading"]').should("exist");
    });

    it("2 element", () => {
      cy.get('li[class="dropdown nav-item"]').first().click();
      cy.get('li[class="dropdown show nav-item"]').contains("Task").click();
      cy.get('h2[id="task-heading"]').find('button[type="button"]').should("exist");
    });

    it("3 element", () => {
      cy.get('li[class="dropdown nav-item"]').first().click();
      cy.get('li[class="dropdown show nav-item"]').contains("User Task").click();
      cy.get('h2[id="user-task-heading"]').should("exist");
    });

    it("4 element", () => {
      cy.get('li[class="dropdown nav-item"]').eq(1).click();
      cy.get('li[class="dropdown show nav-item"]').contains("API").click();
      cy.get("span").invoke("text").should("include", "You are not authorized to access this page.");
    });

    it("5 element", () => {
      cy.get('li[class="dropdown nav-item"]').eq(2).click();
      cy.get('li[class="dropdown show nav-item"]').contains("English").click();
      cy.get("span")
        .invoke("text")
        .should("include", "You are not authorized to access this page.");
    });

    it("6 element", () => {
      cy.get('li[class="dropdown nav-item"]').eq(2).click();
      cy.get('li[class="dropdown show nav-item"]').contains("Français").click();
      cy.get("span")
        .invoke("text")
        .should(
          "include",
          "Vous n'avez pas les droits pour accéder à cette page."
        );
    });

    it("7 element", () => {
      cy.get('li[class="dropdown nav-item"]').eq(2).click();
      cy.get('li[class="dropdown show nav-item"]').contains("Русский").click();
      cy.get("span")
        .invoke("text")
        .should("include", "Вы не авторизованы для доступа к странице.");
    });

    it("8 element", () => {
      cy.get('li[class="dropdown nav-item"]').eq(2).click();
      cy.get('li[class="dropdown show nav-item"]')
        .contains("Українська")
        .click();
      cy.get("span")
        .invoke("text")
        .should("include", "Ви не авторизовані для доступу до цієї сторінки");
    });

    it("9 element", () => {
      cy.get('li[class="dropdown nav-item"]').last().click();
      cy.get('li[class="dropdown show nav-item"]').contains("Settings").click();
      cy.get('h2[id="settings-title"]').should("exist");
    });

    it("10 element", () => {
      cy.get('li[class="dropdown nav-item"]').last().click();
      cy.get('li[class="dropdown show nav-item"]').contains("Password").click();
      cy.get('h2[id="password-title"]').should("exist");
    });

    it("11 element", () => {
      cy.get('li[class="dropdown nav-item"]').last().click();
      cy.get('li[class="dropdown show nav-item"]').contains("Sign out").click();
      cy.get("h4").invoke("text").should("include", "Logged out successfully!");
    });
  });
