const express = require('express');
const router = express.Router();

const { joiSchema } = require('../../models/users');
const { validation, ctrlWrapper, authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/auth");


router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signup));

router.post('/login', validation(joiSchema), ctrlWrapper (ctrl.login))

router.get('/logout', ctrlWrapper(authenticate), ctrlWrapper(ctrl.logout))

router.get('/current', ctrlWrapper(authenticate), ctrlWrapper(ctrl.current));

router.patch('/avatars', ctrlWrapper(authenticate), upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;