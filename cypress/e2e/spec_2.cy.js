describe("my first cypress_test", () => {
    beforeEach(() => {
      cy.visit("https://sqlverifier-li21ca0ed768.herokuapp.com/");
    });
    it("element exist", () => {
      cy.get(".table-responsive").should("exist");
    });
  });