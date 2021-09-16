const { Contact } = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
  const contact = await Contact.findById(req.params.contactId)
  if (!contact) {
    return res.status(404).json({
        message: 'Not found'
      })
  }
     return res.json({contact})
     }
    catch (error) {
        next(error);
    }
}
    module.exports = getContactById;