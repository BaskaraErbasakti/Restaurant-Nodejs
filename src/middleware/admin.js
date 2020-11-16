const respone = require("../helpers/respon")
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")


const checkToken = (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        const result = {
            msg: "Login dulu",
        }
        return respone(res, 401, result)
    }

    const jwtToken = jwtDecode(token)
    const userRole = jwtToken.role
    
    if (userRole !== 'admin') {
        const result = {
            msg: "Hanya admin yang bisa",
        }
        return respone(res, 401, result)
    }

    jwt.verify(token, process.env.JWT_KEYS, (err, decoded) => {
        if (err) {
            return respone(res, 401, err)
        }
        next()
    })
}

module.exports = checkToken