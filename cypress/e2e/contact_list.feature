Feature: Contact List

Scenario: Add Contact with complete information
  Given the user is seeing their contact list
  When the user adds a new contact with complete information
  Then the user sees the contact created

Scenario: Edit contact
  Given the user is seeing a contact details
  When the user edits this contact
  Then the user sees the edited information in the contact details
  And the user sees the edited information in the contacts list

Scenario: Cancel editing contact
  Given the user is editing a contact
  When the user cancels the editing
  Then the user sees the contact with the original data in contact details

Scenario: Delete contact
  Given the user is seeing a contact details
  When the user deletes this contact
  Then the user sees the contact list empty
