
const contactsModel = require('../model/contacts')
const { contactUpdateSchema} = require('../routes/api/validation/contactSchema')

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required name field"
      })
    }
    const contact = await contactsModel.updateContact(req.params.contactId, req.body)
    if (!contact) {
      return res.status(404).json({
        message: "Not found"
      })
    }
    return res.json({ contact })
  }
  catch (error) {
    next(error);
  }
}

module.exports = updateContact;
