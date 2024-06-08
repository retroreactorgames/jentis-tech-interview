import { CommonData, CommonMethods } from "../PageObjects/Common";

export const SignUpData = {
  Strings: {
    name: "John",
    surname: "Doe",
    password: "jentis12345",
  },

  Locators: {
    nameField: "#firstName",
    surnameField: "#lastName",
    emailField: "#email",
    password: "#password",
    submitBtn: "#submit",
    cancelBtn: "#cancel",
  },
};

export const SignUpMethods = {
  fillSignUpForm: (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    cy.get(SignUpData.Locators.nameField).type(name);
    cy.get(SignUpData.Locators.surnameField).type(surname);
    cy.get(SignUpData.Locators.emailField).type(email);
    cy.get(SignUpData.Locators.password).type(password);
  },

  creatingUserAPI: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    cy.request({
      method: "POST",
      url: "https://thinking-tester-contact-list.herokuapp.com/users",
      body: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.user.firstName).to.eq(firstName);
      expect(response.body.user.lastName).to.eq(lastName);
      expect(response.statusText).to.eq("Created");
    });
  },
};
