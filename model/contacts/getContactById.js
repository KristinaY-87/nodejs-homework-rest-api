const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const selectContact = contacts.find(item => item.id === Number(contactId))
      return selectContact; 
}
    
    module.exports = getContactById;