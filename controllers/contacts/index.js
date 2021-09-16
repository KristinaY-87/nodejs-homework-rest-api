const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const addContact = require("./addContact");
const updateStatusContact = require("./updateStatusContact")

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}