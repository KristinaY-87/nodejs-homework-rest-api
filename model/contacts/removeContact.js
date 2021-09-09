const fs = require('fs/promises');
const contactsPath = require('../../db/contactsPath');
const listContacts = require('./listContacts');

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(contactId));
    if (idx === -1) {
      return null
    }
  const delContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return delContact
}

module.exports = removeContact