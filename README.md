Introduction - Contact List Manager App Case study

The development team has created a new application: a contact list manager. This application includes an API with a GUI built on top of it, primarily designed to manage contact information.
Access the API documentation here -> https://documenter.getpostman.com/view/4012288/TzK2bEa8 and view the GUI here -> https://thinking-tester-contact-list.herokuapp.com/

Note that the API documentation is the only resource provided for this app.

Questions

1. What additional documentation or information would have made planning the tests for this app more efficient?
   In a product without documentation or limited amount of it, I would usually start with a mindmap. I believe it is the easiest and fastest way to analyse a system in a higher level and identify what could be potential priority.

I've created a mindmap for this application that can be accessed here.
https://app.mural.co/t/jentisinterview6346/m/jentisinterview6346/1717761406944/3492825bcd10846511ec84270771769480c9eb60?sender=u23db31d5332b6c36cab33401

After identifying the most important parts of the application, now it is time to write functional test cases. I believe that is the best way to ensure we are testing the important features and also some less critical ones.

2. Identify the components of the app that can be tested. Is there a hierarchy of importance in these components?

There are two main components to be tested: Users and Contacts.
For hierarchy, although I think the most important feature is contacts, we cannot forget that being able to create an user and login into the system is also crucial:

1. Sign Up (Used once by a new user, still important so the user can access the app)
2. Login (Crucial feature to use the application)
3. Add Contact (The most important feature in a Contact List)
4. Edit Contact (Usually a very requested feature for database-like apps)
5. Delete Contact (Not the most used, but users could feel annoyed by the inability to remove unwanted ones)
6. User BE functions (Update, Delete, ..., the least important because the users cannot actually perform them)

3) For each identified area, how would you approach testing?
   Now it is time to put the mindmap into use and write test cases for all the discovered scenarios, creating a regression test suite that will ensure we are testing the most important features of the system.

Task
First, create functional test cases for the web application and document them. You can use any format you want and when you are done upload the documentation to the repository.

Before the regression test suite, I believe it is a good practice to start with a Sanity Test Suite, which will have the most important tests, then, we can evolve it to a full regression test suite. I decided to use the Gherkin syntax, since I am a big fan of BDD for its simplicity and accessibility across the whole team.

Sanity Test Suite
Scenario: Sign up
Given a possible user is accessing the application
When the user creates a new account
Then the user is redirected to the contact list

Scenario: Login
Given the user has an account
When the user logs into the system with correct information
Then the user should login

Scenario: Create contact with minimum information
Given the user is seeing their contact list
When the user adds a new contact with minimum information
Then the user sees the new contact created

Regression Test Suite
Scenario: Edit contact
Given the user is seeing a contact details
When the user edit this contact
Then the user sees the edited information in the contact list

Scenario: Cancel editing contact
Given the user is editing a contact
When the user cancel the editing
Then the user sees the contact information not edited

Scenario: Contact details
Given the user is on the contact list
And the user has a contact created
When the user clicks on the contact
Then the user sees the contact details for this contact

Scenario: Create contact with all optional fields
Given the user is creating a contact
When the user fills every field
Then the user sees all the fields filled in the contact list

Scenario: Logout
Given the user is logged in
When the user logs out
Then the user is redirected to the login page

Scenario: Update User information
Given the developer has an user
When the developer update this user information
Then the developer should be able get this user info
And verify that the info was updated

Then, choose the test cases that you think are necessary for a complete regression test suite and implement them. You can use any programming language or testing technology you see fit and when you are done, upload the code to the same repository.

Next steps
Please send back your test results and repository to your recruiter. They will forward it to the hiring team for review. We will then get in touch with you with feedback and if positive we will schedule a technical interview with you, where the test and solutions will be discussed in more detail.
