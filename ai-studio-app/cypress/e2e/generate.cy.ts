/// <reference types="cypress" />

describe("Full Generate Flow", () => {
  it("Signup, login, upload, generate, view history", () => {
    cy.visit("/signup");

    cy.get("input[name=email]", { timeout: 10000 }).type("test@example.com");
    cy.get("input[name=password]").type("12345678");
    cy.get("button[type=submit]").click();
    
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("12345678");
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/login");
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("12345678");
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/generate");
    cy.get("input[type=file]").attachFile("sample.png");
    cy.get("input[name=prompt]").type("Cyberpunk cat");
    cy.get("button:contains('Generate')").click();

    cy.get("img[alt='Generated']").should("exist");
    cy.get("button:contains('History')").click();
    cy.get("div.history-item").should("contain.text", "Cyberpunk cat");
  });
});
