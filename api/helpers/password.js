const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.getEncryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}