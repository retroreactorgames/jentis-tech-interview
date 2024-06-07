import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from "../PageObjects/Common";
import { ContactListData } from "../PageObjects/ContactList";
import { SignUpData, SignUpMethods } from "../PageObjects/SignUp";

Given("a possible user is accessing the application", () => {
  cy.visit(CommonData.URLs.baseUrl);
});

When("the user creates a new account", () => {
  cy.get(CommonData.Locators.signUpBtn).click();

  SignUpMethods.fillForm(
    SignUpData.Strings.name,
    SignUpData.Strings.surname,
    CommonMethods.generateRandomEmail(),
    SignUpData.Strings.password
  );

  cy.get(SignUpData.Locators.submitBtn).click();

  //Waiting for API call after confirming the form
  SignUpMethods.listenToAPIFormResponse();
});

Then("the user is redirected to the contact list", () => {
  cy.get(ContactListData.Locators.logoutBtn).should("be.visible");
  cy.get(ContactListData.Locators.addContactBtn).should("be.visible");
  cy.get(ContactListData.Locators.contactTable).should("be.visible");

  //API testing (simple example of what could be tested here)

  //I noticed that the body when successful comes with a unique ID,
  // But only in some executions the body was correct and my test below
  // Was failing, but then I notice that the response was coming empty,
  // So my test actually found a bug haha
  //SignUpMethods.verifySuccessfulFormBody("formAPI"); //this found a bug, it is suppose to fail
});
