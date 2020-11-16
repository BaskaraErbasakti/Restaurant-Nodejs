const model = require("../model/users")
const respone = require("../helpers/respon")
const bcr = require("bcrypt")
const jwt = require("jsonwebtoken")
const { token } = require("morgan")
const tokenList = {}

class Auth {

    login = async (req, res) => {
        try {
            const passDB = await model.getByUser(req.body.email)
            if (passDB.rows.length <= 0) {
                return respone(res, 200, "Email is not registered")
            }
            const passReq = req.body.password
            const check = await bcr.compare(passReq, passDB.rows[0].password)
            
            if (check) {
                const result = await this.setToken(req.body.email)
                return respone(res, 200, result)
            } else {
                return respone(res, 200, "Invalid Password")
            }

        } catch (error) {
            console.log(error)
            respone(res, 500, error)
        }
    }

    setToken = async (email) => {
        try {
            const payload = {
                'email' : email
            }
            const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: '1h'})
            const result = {
                token,
                msg: "Token created, login succsess",
            }

            return result
        } catch (error) {
            throw error
        }
    }

    token = async (req, res) => {
        try {
            const {refreshToken, username} = req.body
            
            if(refreshToken) {
                const payload = {
                    "name": username
                }
                const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '1h'})
                const response = {
                    "token": token,
                }
                return respone(res, 200, response)   
            } 
        } catch (error) {
            return respone(res, 500, error)
        }
    }
}

module.exports = new Auth()