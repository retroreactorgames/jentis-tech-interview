Feature: Contact List

Scenario: Edit contact
  Given the user is seeing a contact details
  When the user edit this contact
  Then the user sees the edited information in the contact list
  
Scenario: Add Contact with minimum information
  Given the user is seeing their contact list
  When the user adds a new contact with complete information
  Then the user sees the new contact created

