const {Conflict} = require('http-errors');
const { User } = require('../../models/users');

const signup = async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict("Email in use");
        }
        // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        // const result = await User.create({ email, password:hashPassword });

        const newUser = new User({email});
        newUser.setPassword(password);
        await newUser.save();
        res.status(201).json({
            newUser
        })
}

module.exports = signup