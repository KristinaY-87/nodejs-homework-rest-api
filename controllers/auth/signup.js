const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { User } = require('../../models/users');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }

    const defaultAvatar = gravatar.url(email, {s: '200'}, true)   
    const newUser = new User({ email, avatarURL: defaultAvatar });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
        newUser
    });
};

module.exports = signup