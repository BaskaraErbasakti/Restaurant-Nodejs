const database = require("../config/database")
const menu = {}

menu.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM public.menu ORDER BY id ASC ")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = menu