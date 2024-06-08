export const ContactFormData = {
  Strings: {
    firstName: "Doe",
    lastName: "John",
    dateOfBirth: "1900-10-12",
    emailField: "email@email.com",
    phone: "1234567890",
    street1: "Street1",
    street2: "Street2",
    city: "City",
    state: "State",
    postal: "00001",
    country: "Country",
  },

  Locators: {
    firstName: "#firstName",
    lastName: "#lastName",
    dateOfBirth: "#birthdate",
    emailField: "#email",
    phone: "#phone",
    street1: "#street1",
    street2: "#street2",
    city: "#city",
    state: "#stateProvince",
    postal: "#postalCode",
    country: "#country",
    submitBtn: "#submit",
    cancelBtn: "#cancel",
  },
};

export const ContactFormMethods = {
  fillContactForm: (
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    emailField: string,
    phone: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    postal: string,
    country: string
  ) => {
    cy.get(ContactFormData.Locators.firstName).type(firstName);
    cy.get(ContactFormData.Locators.lastName).type(lastName);
    cy.get(ContactFormData.Locators.dateOfBirth).type(dateOfBirth);
    cy.get(ContactFormData.Locators.emailField).type(emailField);
    cy.get(ContactFormData.Locators.phone).type(phone);
    cy.get(ContactFormData.Locators.street1).type(street1);
    cy.get(ContactFormData.Locators.street2).type(street2);
    cy.get(ContactFormData.Locators.city).type(city);
    cy.get(ContactFormData.Locators.state).type(state);
    cy.get(ContactFormData.Locators.postal).type(postal);
    cy.get(ContactFormData.Locators.country).type(country);
  },

  addContactAPI: (
    firstName: string,
    lastName: string,
    birthdate: string,
    email: string,
    phone: string,
    street1: string,
    street2: string,
    city: string,
    stateProvince: string,
    postalCode: string,
    country: string
  ) => {
    cy.request({
      method: "POST",
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
      body: {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        phone: phone,
        street1: street1,
        street2: street2,
        city: city,
        stateProvince: stateProvince,
        postalCode: postalCode,
        country: country,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user.email).to.eq(email);
      expect(response.statusText).to.eq("OK");
    });
  },
};
