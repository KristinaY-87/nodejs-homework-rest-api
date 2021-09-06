const fs = require('fs/promises');
const contactsPath = require('./contactsPath');
const listContacts = require('./listContacts');

const addContact = async (body) => {
  const contacts = await listContacts()
  function getNextUniqId(contacts) {
      return Math.max(...contacts.map((contact) => contact.id)) + 1
    }
  const newContact = { id: getNextUniqId(contacts), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

module.exports = addContact