import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from "../PageObjects/Common";
import { SignUpData, SignUpMethods } from "../PageObjects/SignUp";
import { LoginMethods } from "../PageObjects/Login";

beforeEach(() => {
  CommonMethods.generateRandomEmail();
});

Given("the user has an account", () => {
  CommonMethods.createNewUserAndLogin();

  cy.visit(CommonData.URLs.baseUrl);
});

When("the user logs into the system with correct information", () => {
  const email = Cypress.env("randomEmail");

  LoginMethods.fillLoginForm(email, SignUpData.Strings.password);

  cy.get(SignUpData.Locators.submitBtn).click();
});
