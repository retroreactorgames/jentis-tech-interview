export const LoginData = {
  Strings: {
    password: "jentis12345",
  },

  Locators: {
    emailField: "#email",
    password: "#password",
    submitBtn: "#submit",
  },
};

export const LoginMethods = {
  fillLoginForm: (email: string, password: string) => {
    cy.get(LoginData.Locators.emailField).type(email);
    cy.get(LoginData.Locators.password).type(password);
  },

  loginAPI: (email: string, password: string) => {
    cy.request({
      method: "POST",
      url: "https://thinking-tester-contact-list.herokuapp.com/users/login",
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      const token = response.body.token;
      cy.log(token);
      Cypress.env("token", token);
      cy.log(Cypress.env("token"));
      expect(response.status).to.eq(200);
      expect(response.body.user.email).to.eq(email);
      expect(response.statusText).to.eq("OK");
    });
  },
};
