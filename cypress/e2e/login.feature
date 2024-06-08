Feature: Login

Scenario: Login with correct information
  Given the user has an account
  When the user logs into the system with correct information
  Then the user is redirected to the contact list

Scenario: Logout
  Given the user is seeing their contact list
  When the user logs out
  Then the user is redirected to the login page