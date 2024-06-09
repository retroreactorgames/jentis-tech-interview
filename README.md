Introduction - Contact List Manager App Case study

The development team has created a new application: a contact list manager. This application includes an API with a GUI built on top of it, primarily designed to manage contact information.
Access the API documentation here -> https://documenter.getpostman.com/view/4012288/TzK2bEa8 and view the GUI here -> https://thinking-tester-contact-list.herokuapp.com/

Note that the API documentation is the only resource provided for this app.

###Questions

**1. What additional documentation or information would have made planning the tests for this app more efficient?**

In a product without documentation or limited amount of it, I would usually start with a mindmap. I believe it is the easiest and fastest way to analyse a system in a higher level and identify what could be potential priority.

I've created a mindmap for this application that can be accessed here.
https://app.mural.co/t/jentisinterview6346/m/jentisinterview6346/1717761406944/3492825bcd10846511ec84270771769480c9eb60?sender=u23db31d5332b6c36cab33401

After identifying the most important parts of the application, now it is time to write functional test cases. I believe that is the best way to ensure we are testing the important features and also some less critical ones.

**2. Identify the components of the app that can be tested. Is there a hierarchy of importance in these components?**

There are two main components to be tested: Users and Contacts.
For hierarchy, although I think the most important feature is contacts, we cannot forget that being able to create an user and login into the system is also crucial:

1. Sign Up (Used once by a new user, still important so the user can access the app)
2. Login (Crucial feature to use the application)
3. Add Contact (The most important feature in a Contact List)

4) Edit Contact (Usually a very requested feature for database-like apps)
5) Delete Contact (Not the most used, but users could feel annoyed by the inability to remove unwanted ones)
6) User BE functions (Update, Delete, ..., the least important because the users cannot actually perform them)

**3. For each identified area, how would you approach testing?**

Now it is time to put the mindmap into use and write test cases for all the discovered scenarios, creating a regression test suite that will ensure we are testing the most important features of the system.

###Task

**First, create functional test cases for the web application and document them. You can use any format you want and when you are done upload the documentation to the repository.**

Before the regression test suite, I believe it is a good practice to start with a Sanity Test Suite, which will have the most important tests, then, we can evolve it to a full regression test suite. I decided to use the Gherkin syntax, since I am a big fan of BDD for its simplicity and accessibility across the whole team.

####Sanity Test Suite

**Scenario: Sign up**  
**Given** a possible user is accessing the application  
**When** the user creates a new account  
**Then** the user is redirected to the contact list

**Scenario: Login**  
**Given** the user has an account  
**When** the user logs into the system with correct information  
**Then** the user is redirected to the contact list

**Scenario: Create contact with complete information**  
**Given** the user is seeing their contact list  
**When** the user adds a new contact with minimum information  
**Then** the user sees the new contact created

####Regression Test Suite

**Scenario: Edit contact**
**Given** the user is seeing a contact details  
**When** the user edits this contact  
**Then** the user sees the edited information in the contact list

**Scenario: Cancel editing contact**  
**Given** the user is editing a contact  
**When** the user cancels the editing  
**Then** the user sees the contact information not edited

**Scenario: Delete contact**  
**Given** the user is seeing a contact details  
**When** the user deletes this contact  
**Then** the user sees the contact list empty

**Scenario: Logout**  
**Given** the user is seeing their contact list  
**When** the user logs out  
**Then** the user is redirected to the login page

_(I wouldn't create a scenario for this since we have plenty of tests that access this page and check data)_  
**Scenario: Contact details**  
**Given** the user is on the contact list  
**And** the user has a contact created  
**When** the user clicks on the contact  
**Then** the user sees the contact details for this contact

_(Integration test, probably not the best to be automated on Cypress, although it is easy to do it)_  
**Scenario: Update User information**  
**Given** the developer has an user  
**When** the developer update this user information  
**Then** the developer should be able get this user info  
**And** verify that the info was updated

**Then, choose the test cases that you think are necessary for a complete regression test suite and implement them. You can use any programming language or testing technology you see fit and when you are done, upload the code to the same repository.**

For the automation, I decided to use Cypress with Typescript as the coding language, because I believe it's the current tech stack for E2E testing on Jentis? (I might be wrong here)

####Setup
**Cloning the Repository**
This the repository I've used for this coding challenge. It is a public one, so just go ahead and clone it.  
https://github.com/retroreactorgames/jentis-tech-interview

**Installing Cypress**
On the cloned repository root, run this commands on your terminal:

> For yarn: yarn add cypress --dev
> For npm: npm install cypress --save-dev

**Installing Node**
I used nvm to install the latest version of node: 22.2.0. You need at least version 18 to properly run Cypress.
I used _Brew_ to install nvm

> brew install -g nvm

**Installing Dependencies**
This project uses a couple of external libraries, the most important one being _badeball/cypress-cucumber-preprocessor_ that allow us to change Cypress configuration and how it detects tests. With this library, it will only detect _.feature_ files, after also setting up the cypress.config.ts the value of **specPattern: "**/\*.feature"\*\*

They are all listed in the root of the project in the package.json file. To install them run in your project root the command:

> npm install

It should install the correct dependencies to run the tests.

**Running the Tests**

> npm run cypress:open

This command will open cypress and start its server.

####Code Organisation

**Tests**
_/cypress/e2e_  
You will find all the tests cases in this folder.
This tests were written in BDD using the Gherkin Syntax.
The tests are the ".feature" files.

**BDD Step Definition**
_/cypress/support/step_definitions_  
Each testing keyword (Given, When, Then, And) are mapped into a function.
Here you can find 3 files, one for each of the .feature files. They are written in ".ts".

**PageObjects**
_/cypress/support/PageObjects_
That's where I've organised all the locators and specific methods separated by the pages I saw in the system.
It's a common good practice to have this code standard for better organisation of locators. Although it is called PageObject,
I also added specific methods, making it a mix with PageFactory. I prefer it to put them together to avoid too many files.
