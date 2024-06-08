import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from "../PageObjects/Common";
import { ContactListData } from "../PageObjects/ContactList";
import { LoginMethods } from "../PageObjects/Login";
import {
  ContactFormData,
  ContactFormMethods,
} from "../PageObjects/ContactForm";
import { SignUpData, SignUpMethods } from "../PageObjects/SignUp";

beforeEach(() => {
  CommonMethods.generateRandomEmail();
});

Given("the user is seeing their contact list", () => {
  //I believe it is a really good practice to speed tests up
  //setting up the test with API calls, this way we avoid
  //retesting the same parts of the application over and over

  const email = Cypress.env("randomEmail");

  SignUpMethods.creatingUserAPI(
    SignUpData.Strings.name,
    SignUpData.Strings.surname,
    email,
    SignUpData.Strings.password
  );

  LoginMethods.loginAPI(email, SignUpData.Strings.password);

  cy.visit(`${CommonData.URLs.baseUrl}contactList`);
});

Given("the user is seeing a contact details", () => {
  CommonMethods.createNewUserAndLogin();

  ContactFormMethods.addContactAPI(
    ContactFormData.Strings.firstName,
    ContactFormData.Strings.lastName,
    ContactFormData.Strings.dateOfBirth,
    ContactFormData.Strings.emailField,
    ContactFormData.Strings.phone,
    ContactFormData.Strings.street1,
    ContactFormData.Strings.street2,
    ContactFormData.Strings.city,
    ContactFormData.Strings.state,
    ContactFormData.Strings.postal,
    ContactFormData.Strings.country
  );
  cy.visit(`${CommonData.URLs.baseUrl}contactList`);
});

When("the user adds a new contact with complete information", () => {
  cy.get(ContactListData.Locators.addContactBtn).click();

  ContactFormMethods.fillContactForm(
    ContactFormData.Strings.firstName,
    ContactFormData.Strings.lastName,
    ContactFormData.Strings.dateOfBirth,
    ContactFormData.Strings.emailField,
    ContactFormData.Strings.phone,
    ContactFormData.Strings.street1,
    ContactFormData.Strings.street2,
    ContactFormData.Strings.city,
    ContactFormData.Strings.state,
    ContactFormData.Strings.postal,
    ContactFormData.Strings.country
  );

  cy.get(ContactFormData.Locators.submitBtn).click();
});

Then("the user sees the new contact created", () => {
  //To avoid having to install another library for cypress-xpath
  //I prefer to verify just the text on the Contact List
  //I know this would not be enough for a bigger contact list
  //But for a starting regression suite is ok, in my opinion.

  //In the future, maybe we could evolve this getting the id from
  //the new contact by the API and getting locator values based on it in the html

  cy.get(ContactListData.Locators.contactTable).should("be.visible");

  const fullName =
    ContactFormData.Strings.firstName + " " + ContactFormData.Strings.lastName;
  cy.contains(fullName);

  cy.contains(ContactFormData.Strings.dateOfBirth);
  cy.contains(ContactFormData.Strings.emailField);
  cy.contains(ContactFormData.Strings.phone);

  const fullAddress =
    ContactFormData.Strings.street1 + " " + ContactFormData.Strings.street2;
  cy.contains(fullAddress);

  const fullDetailsAddress =
    ContactFormData.Strings.city +
    " " +
    ContactFormData.Strings.state +
    " " +
    ContactFormData.Strings.postal;
  cy.contains(fullDetailsAddress);

  cy.contains(ContactFormData.Strings.country);
});
