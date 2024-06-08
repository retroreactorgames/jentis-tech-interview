import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from "../PageObjects/Common";
import { ContactListData } from "../PageObjects/ContactList";
import { SignUpData, SignUpMethods } from "../PageObjects/SignUp";

beforeEach(() => {
  CommonMethods.generateRandomEmail();
});

Given("a possible user is accessing the application", () => {
  cy.visit(`${CommonData.URLs.baseUrl}`);
});

When("the user creates a new account", () => {
  cy.get(CommonData.Locators.signUpBtn).click();

  const email = Cypress.env("randomEmail");

  SignUpMethods.fillSignUpForm(
    SignUpData.Strings.name,
    SignUpData.Strings.surname,
    email,
    SignUpData.Strings.password
  );

  cy.get(SignUpData.Locators.submitBtn).click();
});

Then("the user is redirected to the contact list", () => {
  cy.get(ContactListData.Locators.logoutBtn).should("be.visible");
  cy.get(ContactListData.Locators.addContactBtn).should("be.visible");
  cy.get(ContactListData.Locators.contactTable).should("be.visible");
});
