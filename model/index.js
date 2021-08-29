const fs = require('fs/promises')
const path = require("path");
// const contacts = require('./contacts.json')
const contactsPath = path.join(__dirname, 'contacts.json');

const readData = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const listContacts = async () => {
  return  readData()
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const selectContact = contacts.find(item => item.id === Number(contactId))
    //   if (!selectContact) {
    //     throw new Error(`Contacts with id= ${contactId} not found`)
    // }
      return selectContact; 
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(contactId));
    if (idx === -1) {
      // throw new Error(`Contact with id=${contactId} not found`);
      return null
    }
  const delContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return delContact
}

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

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === Number(contactId));
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body }
  // const upContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}

// -----рабочая версия---------
//   const [result] = contacts.filter((contact) => contact.id === Number(contactId))
//   if (result) {
//     Object.assign(result, body)
//     await fs.writeFile(contactsPath, JSON.stringify(contacts))
//   }
//   return result
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
