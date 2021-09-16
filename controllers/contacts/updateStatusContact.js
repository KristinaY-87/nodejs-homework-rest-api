const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
       const { favorite } = req.body;
if (!favorite) {
    return res.status(400).json({
        message: "missing field favorite"
      })
     }
  const contact = await Contact.findByIdAndUpdate(req.params.contactId, { favorite }, {new: true})
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

module.exports = updateStatusContact