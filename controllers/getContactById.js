const contactsModel = require('../model/contacts')

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsModel.getContactById(req.params.contactId)
    if (!contact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    return res.json({ contact })
  }
  catch (error) {
    next(error);
  }
}
    module.exports = getContactById;