const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models/users');
const sendMail = require('../../utils/sendMail')

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }

    const defaultAvatar = gravatar.url(email, { s: '200' }, true)
    const newUser = new User({ email, avatarURL: defaultAvatar });
    
    newUser.createVerifyToken()
    newUser.setPassword(password);
    const { verifyToken } = newUser;
    const data = {
        to: email,
        subject: 'Registration successful',
        html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Confirm registration</a>`
    }
    await newUser.save();
    await sendMail(data)
 
    res.status(201).json({
        newUser,
        html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Confirm registration</a>`
    });
};

module.exports = signup