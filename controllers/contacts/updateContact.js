const { Contact } = require("../../models/contacts");

const updateContact = async (req, res, next) => {
try {
  const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
     if (!contact) {
    return res.status(404).json({
        message: "Not found"
      })
     }
     return res.json({contact})
}
catch (error) {
        next(error);
    }
}

module.exports = updateContact;
