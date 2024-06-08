import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from "../PageObjects/Common";
import { SignUpData } from "../PageObjects/SignUp";
import { LoginData, LoginMethods } from "../PageObjects/Login";
import { ContactListData } from "../PageObjects/ContactList";

beforeEach(() => {
  CommonMethods.generateRandomEmail();
});

Given("the user has an account", () => {
  CommonMethods.createNewUserAndLogin();

  cy.visit(CommonData.URLs.baseUrl);
});

When("the user logs out", () => {
  cy.get(ContactListData.Locators.logoutBtn).click();
});

When("the user logs into the system with correct information", () => {
  const email = Cypress.env("randomEmail");

  LoginMethods.fillLoginForm(email, SignUpData.Strings.password);

  cy.get(SignUpData.Locators.submitBtn).click();
});

Then("the user is redirected to the login page", () => {
  cy.get(LoginData.Locators.emailField).should("be.visible");
  cy.get(LoginData.Locators.password).should("be.visible");
});
