const {NotFound} = require("http-errors");
const { User } = require('../../models/users')

const verify = async (req, res) => {
  
        const { verifyToken } = req.params;
        const user = await User.findOne({ verifyToken });
        if (!user) {
            throw new NotFound("User not found");
        }
        await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
        res.send("<h2>Email verify</h2>");

}
module.exports = verify;