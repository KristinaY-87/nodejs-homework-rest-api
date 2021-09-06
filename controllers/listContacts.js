const contactsModel = require('../model/contacts')

const listContacts = async (req, res, next) => {
  try {
      const contacts = await contactsModel.listContacts()
     return res.json({status: 'success', code: 200, data: {contacts}})
     }
    catch (error) {
        next(error);
    }
}
module.exports = listContacts;