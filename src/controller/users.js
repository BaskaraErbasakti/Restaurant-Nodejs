const model = require("../model/users")
const respone = require("../helpers/respon")
const hashPassword = require("../helpers/hash")

class Users {
    
    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async getByUser(req, res) {
        try {
            const email = req.body.email
            const result = await model.getByUser(email)
            return respone(res, 200, result.rows)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async getById(req, res) {
        try {
            const result = await model.getById(req.params.id)
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async addUsers(req, res) {
        try {
            const countEmail = await model.getByUser(req.body.email)
            if (!req.body.firstName) {
                return respone(res, 200, 'Please add first name')
            }
            if (!req.body.lastName) {
                return respone(res, 200, 'Please add last name')
            }
            if (countEmail.rowCount > 0) {
                return respone(res, 200, 'Email account already exist')
            }
            if (req.body.password.length < 6){
                return respone(res, 200, 'Password must contain at least 6 characters')
            }
            const passHash = await hashPassword(req.body.password)
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passHash,
            }      
            await model.addUsers(data)
            return respone(res, 200)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async delUsers(req, res) {
        try {
            const result = await model.delUsers(req.body.email)
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }
}

module.exports = new Users()