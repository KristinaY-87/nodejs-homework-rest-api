const { NotFound, BadRequest } = require('http-errors')
const { User } = require('../../models/users')
const { sendMail } = require('../../utils/sendMail')

const sendAgain = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!email) {
    throw new BadRequest('Email is required')
  }
  if (!user) {
    throw new NotFound('Not found')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const { verifyToken } = user;
  const data = {
    to: email,
    subject: 'Registration successful',
    html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Confirm registration!</a>`,
  }
  await sendMail(data)

  res.json({ message: 'Verification email sent' })
};

module.exports = sendAgain