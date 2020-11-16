const Pool = require('pg-pool')

const produk = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
})

module.exports = produk