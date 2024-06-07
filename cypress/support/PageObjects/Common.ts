// Common elements that can be used by many different pages
export const CommonData = {
  URLs: {
    baseUrl: "https://thinking-tester-contact-list.herokuapp.com/",
  },
  Locators: {
    signUpBtn: "#signup",

    ///
    menuButton: 'button[aria-label="Menü öffnen"]',
    menu: ".container.ng-star-inserted.is-open",
    menuOptions: ".nav-list-container",
  },
};

//Common methods
export const CommonMethods = {
  //Might not be the best way... position can change...
  //I thought I could get by text, but text can also change...
  //Ended up choosing number by scalability
  selectMenuOptionByNumber: (number: number) => {
    cy.get(CommonData.Locators.menuOptions).children().eq(number).click();
  },
  generateRandomEmail: () => {
    const username = Math.random().toString(36).substring(2, 10); // Generate a random string for username
    const domain = "example.com"; // Your desired domain
    return `${username}@${domain}`;
  },
};
