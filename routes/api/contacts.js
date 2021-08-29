const express = require('express')
const router = express.Router()
const contactsModel = require('../../model')
const {contactCreateSchema, contactUpdateSchema} = require('./validation/contactSchema')

router.get('/', async (req, res, next) => {
  try {
      const contacts = await contactsModel.listContacts()
     return res.json({status: 'success', code: 200, data: {contacts}})
     }
    catch (error) {
        next(error);
    }
})

router.get('/:contactId', async (req, res, next) => {
try {
  const contact = await contactsModel.getContactById(req.params.contactId)
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
})

router.post('/', async (req, res, next) => { 
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
      .json({ newContact})
     }
    catch (error) {
        next(error);
    }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const delContact = await contactsModel.removeContact(req.params.contactId)
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
})

router.put('/:contactId',  async (req, res, next) => {
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
     return res.json({contact})
}
catch (error) {
        next(error);
    }
})

module.exports = router
