import { faker } from "@faker-js/faker";

let adminName = "admin";
let adminPassword = "admin";
let adminToken;
let testName = "landysh";
let testPassword = "admin";
let testEmail = "land@gmail.com";
let testAccountID;
let testToken;
let taskID;
let taskText;
let taskAnswer;
let taskTitle;

describe("API_test_preparation", () => {
  it("API_create_new_account", () => {
    cy.request({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: Cypress.config("baseUrl") + "/api/register",
      body: {
        id: 0,
        login: testName,
        firstName: "string",
        lastName: "string",
        email: testEmail,
        imageUrl: "string",
        activated: true,
        langKey: "string",
        createdBy: "string",
        createdDate: "2023-12-21T10:02:42.214Z",
        lastModifiedBy: "string",
        lastModifiedDate: "2023-12-21T10:02:42.214Z",
        authorities: ["ROLE_ADMIN"],
        password: testPassword,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });

  it("API_login_admin", () => {
    cy.request({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: Cypress.config("baseUrl") + "/api/authenticate",
      body: {
        username: adminName,
        password: adminPassword,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      adminToken = response.body.id_token;
    });
  });

  it("Get_info_new_account", () => {
    cy.request({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken,
      },
      url: Cypress.config("baseUrl") + "/api/admin/users/" + testName,
    }).then((response) => {
      expect(response.status).to.equal(200);
      testAccountID = response.body.id;
    });
  });

  it("Aktivation_new_account", () => {
    cy.request({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken,
      },
      url: Cypress.config("baseUrl") + "/api/admin/users",
      body: {
        id: testAccountID,
        login: testName,
        firstName: "string",
        lastName: "string",
        email: testEmail,
        imageUrl: "string",
        activated: true,
        langKey: "string",
        createdBy: "string",
        createdDate: "2023-12-21T10:18:44.284Z",
        lastModifiedBy: "string",
        lastModifiedDate: "2023-12-21T10:18:44.284Z",
        authorities: ["ROLE_ADMIN"],
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("Login_new_account", () => {
    cy.request({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken,
      },
      url: Cypress.config("baseUrl") + "/api/authenticate",
      body: {
        username: testName,
        password: testPassword,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      testToken = response.body.id_token;
    });
  });
});

after(() => {
  cy.request({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + adminToken,
    },
    url: Cypress.config("baseUrl") + "/api/admin/users/" + testName,
  }).then((response) => {
    expect(response.status).to.equal(204);
  });
});

describe("API_creating_task", () => {
  it("creatingTask", () => {
    cy.request({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + testToken,
      },
      url: Cypress.config("baseUrl") + "/api/tasks",
      body: {
        id: null,
        text: faker.word.noun(4),
        answer: faker.word.noun(4),
        title: faker.word.noun(4),
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      taskID = response.body.id;
      taskText = response.body.text;
      taskAnswer = response.body.answer;
      taskTitle = response.body.title;
    });
  });

  it("changingTask", () => {
    cy.request({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + testToken,
      },
      url: Cypress.config("baseUrl") + "/api/tasks/" + taskID,
      body: {
        id: taskID,
        text: faker.word.noun(3),
        answer: taskAnswer,
        title: taskTitle,
      },
    }).then((response) => {
      expect(response.body.text).to.not.include(taskText);
    });
  });

  it("deletingTask", () => {
    cy.request({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + testToken,
      },
      url: Cypress.config("baseUrl") + "/api/tasks/" + taskID,
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});
