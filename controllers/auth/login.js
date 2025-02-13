const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken')
const { User } = require('../../models/users')

const login = async (req, res) => {
 
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized('Wrong email or password')
    }
  
    const payload = {
        id: user._id
    }
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY)
      await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
}

module.exports = login;