const bcr = require('bcrypt')


async function hashPassword (pasword) {
    try {
        const salt = await bcr.genSalt(10)
        const result = await bcr.hash(pasword, salt)
        return result

    } catch (error) {
        throw error
    }
}

module.exports = hashPassword