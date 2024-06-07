// Common elements that can be used by many different pages
export const SignUpData = {
  Strings: {
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
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

//Common methods
export const SignUpMethods = {
  fillForm: (
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
  listenToAPIFormResponse: () => {
    cy.intercept(
      {
        method: "POST",
        url: "https://api.testing.powerus.de/companies/company-contact",
      },
      []
    ).as("formAPI");
  },
  /*
  verifySuccessfulFormBody: (alias: any) => {
    cy.wait(`@${alias}`).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("id").and.not.to.be.empty;
    });
  },
  */
};
