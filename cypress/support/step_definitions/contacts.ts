import {
  When,
  Then,
  Given,
  Step,
} from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from "../PageObjects/Common";
import { ContactListData } from "../PageObjects/ContactList";
import { LoginData, LoginMethods } from "../PageObjects/Login";
import {
  ContactFormData,
  ContactFormMethods,
} from "../PageObjects/ContactForm";
import { SignUpData, SignUpMethods } from "../PageObjects/SignUp";
import { ContactDetailsData } from "../PageObjects/ContactDetails";

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
  CommonMethods.setupSessionWithContactCreated();
});

Given("the user is editing a contact", () => {
  CommonMethods.setupSessionWithContactCreated();
  cy.contains(ContactFormData.Strings.firstName).click();
  cy.get(ContactDetailsData.Locators.editContactBtn).click();

  ContactFormMethods.clearContactForm();

  ContactFormMethods.fillContactForm(
    ContactDetailsData.Strings.firstNameEdited,
    ContactDetailsData.Strings.lastNameEdited,
    ContactDetailsData.Strings.dateOfBirthEdited,
    ContactDetailsData.Strings.emailFieldEdited,
    ContactDetailsData.Strings.phoneEdited,
    ContactDetailsData.Strings.street1Edited,
    ContactDetailsData.Strings.street2Edited,
    ContactDetailsData.Strings.cityEdited,
    ContactDetailsData.Strings.stateEdited,
    ContactDetailsData.Strings.postalEdited,
    ContactDetailsData.Strings.countryEdited
  );
});

When("the user edits this contact", () => {
  cy.contains(ContactFormData.Strings.firstName).click();
  cy.get(ContactDetailsData.Locators.editContactBtn).click();

  ContactFormMethods.clearContactForm();

  ContactFormMethods.fillContactForm(
    ContactDetailsData.Strings.firstNameEdited,
    ContactDetailsData.Strings.lastNameEdited,
    ContactDetailsData.Strings.dateOfBirthEdited,
    ContactDetailsData.Strings.emailFieldEdited,
    ContactDetailsData.Strings.phoneEdited,
    ContactDetailsData.Strings.street1Edited,
    ContactDetailsData.Strings.street2Edited,
    ContactDetailsData.Strings.cityEdited,
    ContactDetailsData.Strings.stateEdited,
    ContactDetailsData.Strings.postalEdited,
    ContactDetailsData.Strings.countryEdited
  );

  cy.get(ContactFormData.Locators.submitBtn).click();
});

When("the user cancels the editing", () => {
  cy.get(ContactFormData.Locators.cancelBtn).click();
});

When("the user deletes this contact", () => {
  cy.contains(ContactFormData.Strings.firstName).click();
  cy.get(ContactDetailsData.Locators.deleteContactBtn).click();
  cy.focused().type("{enter}");
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

Then("the user sees the contact created", () => {
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

Then("the user sees the edited information in the contact details", () => {
  const fullName =
    ContactFormData.Strings.firstName +
    ContactDetailsData.Strings.firstNameEdited;
  cy.get(ContactDetailsData.Locators.firstName).contains(fullName);
  cy.get(ContactDetailsData.Locators.lastName).contains(
    ContactDetailsData.Strings.lastNameEdited
  );
  cy.get(ContactDetailsData.Locators.dateOfBirth).contains(
    ContactDetailsData.Strings.dateOfBirthEdited
  );
  cy.get(ContactDetailsData.Locators.emailField).contains(
    ContactDetailsData.Strings.emailFieldEdited
  );
  cy.get(ContactDetailsData.Locators.phone).contains(
    ContactDetailsData.Strings.phoneEdited
  );
  cy.get(ContactDetailsData.Locators.street1).contains(
    ContactDetailsData.Strings.street1Edited
  );
  cy.get(ContactDetailsData.Locators.street2).contains(
    ContactDetailsData.Strings.street2Edited
  );
  cy.get(ContactDetailsData.Locators.city).contains(
    ContactDetailsData.Strings.cityEdited
  );
  cy.get(ContactDetailsData.Locators.state).contains(
    ContactDetailsData.Strings.stateEdited
  );
  cy.get(ContactDetailsData.Locators.postal).contains(
    ContactDetailsData.Strings.postalEdited
  );
  cy.get(ContactDetailsData.Locators.country).contains(
    ContactDetailsData.Strings.countryEdited
  );
});

Then("the user sees the edited information in the contacts list", () => {
  cy.get(ContactDetailsData.Locators.returnBtn).click();

  const fullName =
    ContactFormData.Strings.firstName +
    ContactDetailsData.Strings.firstNameEdited +
    " " +
    ContactDetailsData.Strings.lastNameEdited;
  cy.contains(fullName);

  cy.contains(ContactDetailsData.Strings.dateOfBirthEdited);
  cy.contains(ContactDetailsData.Strings.emailFieldEdited);
  cy.contains(ContactDetailsData.Strings.phoneEdited);
  const fullAddress =
    ContactDetailsData.Strings.street1Edited +
    " " +
    ContactDetailsData.Strings.street2Edited;
  cy.contains(fullAddress);

  const fullDetailsAddress =
    ContactDetailsData.Strings.cityEdited +
    " " +
    ContactDetailsData.Strings.stateEdited +
    " " +
    ContactDetailsData.Strings.postalEdited;

  cy.contains(fullDetailsAddress);

  cy.contains(ContactDetailsData.Strings.countryEdited);
});

Then(
  "the user sees the contact with the original data in contact details",
  () => {
    const email = Cypress.env("randomEmail");

    cy.get(ContactDetailsData.Locators.firstName).contains(
      ContactFormData.Strings.firstName
    );
    cy.get(ContactDetailsData.Locators.lastName).contains(
      ContactFormData.Strings.lastName
    );
    cy.get(ContactDetailsData.Locators.dateOfBirth).contains(
      ContactFormData.Strings.dateOfBirth
    );
    cy.get(ContactDetailsData.Locators.emailField).contains(email);
    cy.get(ContactDetailsData.Locators.phone).contains(
      ContactFormData.Strings.phone
    );
    cy.get(ContactDetailsData.Locators.street1).contains(
      ContactFormData.Strings.street1
    );
    cy.get(ContactDetailsData.Locators.street2).contains(
      ContactFormData.Strings.street2
    );
    cy.get(ContactDetailsData.Locators.city).contains(
      ContactFormData.Strings.city
    );
    cy.get(ContactDetailsData.Locators.state).contains(
      ContactFormData.Strings.state
    );
    cy.get(ContactDetailsData.Locators.postal).contains(
      ContactFormData.Strings.postal
    );
    cy.get(ContactDetailsData.Locators.country).contains(
      ContactFormData.Strings.country
    );
  }
);

Then("the user sees the contact list empty", () => {
  cy.get(ContactListData.Locators.contactTableBodyRow).should("not.exist");
});
