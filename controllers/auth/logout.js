const { Unauthorized } = require('http-errors');
const { User } = require('../../models/users');

const logout = async (req, res) => {
   const user = await User.findByIdAndUpdate(req.user._id, { token: null });
    
    if(!user) {
        throw new Unauthorized ('Not authorized')
    }
    res.status(204).json({
        message: "Not Content"
    })
}
module.exports = logout;