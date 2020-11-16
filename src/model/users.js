const db = require("../config/database")

class Users {
    getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users ORDER BY id ASC")
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getByUser(email) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM public.users WHERE email = '${email}'`)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getById(idusers) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id = ${idusers}`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    addUsers(data) {
        const q = `INSERT INTO public.users(email, password, "first name", "last name") VALUES ( '${data.email}', '${data.password}', '${data.firstName}', '${data.lastName}')`
        return new Promise((resolve, reject) => {
            db.query(q)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    delUsers(data) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM public.users WHERE email = '${data}'`)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    setToken(user, token) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE public.users SET token = '${token}' WHERE username = '${user}'`)
                .then((res) => {
                    resolve(`token set in user : ${user}`)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = new Users()