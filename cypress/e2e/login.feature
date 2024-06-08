Feature: Login

Scenario: Login with correct information
  Given the user has an account
  When the user logs into the system with correct information
  Then the user is redirected to the contact list