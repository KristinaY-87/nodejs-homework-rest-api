const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp')

const { User } = require('../../models/users');
const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {

    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const uploadPath = path.join(avatarsDir, `${_id}`);
    const avatarPath = path.join(uploadPath, originalname);
    try {
        await fs.mkdir(uploadPath);
        const readFile = await Jimp.read(tempPath)
        await readFile.resize(250, 250).write(tempPath)
        await fs.rename(tempPath, avatarPath);
        const avatarURL = `/avatars/${_id}/${originalname}`;
        await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatar