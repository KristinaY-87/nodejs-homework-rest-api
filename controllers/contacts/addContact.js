const { Contact } = require("../../models/contacts");


const addContact = async (req, res, next) => {
  try{
  const newContact = { ...req.body, owner: req.user._id };
    const result = await Contact.create(newContact);
  if (result) {
    res.status(201).json({
      result
    })
    }
      }
  catch (error) {
    next(error)
}
}
module.exports = addContact