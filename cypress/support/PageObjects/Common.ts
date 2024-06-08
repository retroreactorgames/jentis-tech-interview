import { LoginMethods } from "./Login";
import { SignUpData, SignUpMethods } from "./SignUp";

export const CommonData = {
  URLs: {
    baseUrl: "https://thinking-tester-contact-list.herokuapp.com/",
  },
  Locators: {
    signUpBtn: "#signup",
  },
};

export const CommonMethods = {
  generateRandomEmail: () => {
    const username = Math.random().toString(36).substring(2, 20);
    const domain = "example.com";
    const randomEmail = `${username}@${domain}`;
    Cypress.env("randomEmail", randomEmail);
  },

  createNewUserAndLogin: () => {
    const email = Cypress.env("randomEmail");

    SignUpMethods.creatingUserAPI(
      SignUpData.Strings.name,
      SignUpData.Strings.surname,
      email,
      SignUpData.Strings.password
    );

    LoginMethods.loginAPI(email, SignUpData.Strings.password);
  },
};
