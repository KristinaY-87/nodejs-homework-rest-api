const { Contact } = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const delContact = await Contact.findByIdAndDelete(req.params.contactId)
    if (!delContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({
      status: 'success', code: 200, "message": "contact deleted"
    })
  }
  catch (error) {
    next(error);
  }
}

module.exports = removeContact