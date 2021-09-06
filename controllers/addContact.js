const { contactCreateSchema} = require('../routes/api/validation/contactSchema');
const contactsModel = require('../model/contacts')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required name field"
      })
    }
    const newContact = await contactsModel.addContact(req.body)
    return res
      .status(201)
      .json({ newContact })
  }
  catch (error) {
    next(error);
  }
}
module.exports = addContact