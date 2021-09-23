const express = require('express')
const router = express.Router()
const { joiSchema } = require('../../models/contacts');
const { validation, ctrlWrapper, authenticate  } = require('../../middlewares');
const ctrl = require("../../controllers/contacts");

router.get('/', ctrlWrapper(authenticate), ctrl.listContacts)

router.get('/:contactId',ctrlWrapper(authenticate), ctrl.getContactById)

router.post("/",  ctrlWrapper(authenticate), validation(joiSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId',ctrlWrapper(authenticate), ctrl.removeContact);

router.put('/:contactId',ctrlWrapper(authenticate), validation(joiSchema), ctrl.updateContact);
   
router.patch("/:contactId/favorite", ctrlWrapper(authenticate),ctrl.updateStatusContact)


module.exports = router
