const database = require("../config/database")
const Product = {}

Product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM public.menus ORDER BY id ASC ")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Product.Add = (datas) => {
    database
        .query(`INSERT INTO public.menus (name, price, images, category) VALUES ('${datas.name}', ${datas.price}, '${datas.images}', '${datas.category}')`)
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

Product.Edit = (id, name, price, images) => {
    database
        .query(`UPDATE public.menus SET name='${name}', price='${price}', images='${images}' WHERE id=${id};`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di update"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

Product.Delete = (name) => {
    database
        .query(
            `DELETE FROM public.menus WHERE name='${name}';`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di hapus"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

Product.search = (name) => {
    return new Promise((resolve, reject) => {    
        database
        .query(
            `SELECT * FROM public.menus WHERE lower(name) LIKE lower('%${name}%') `)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.sort = (sort) => {
    return new Promise((resolve, reject) => {    
        database
        .query(
            `SELECT * FROM public.menus ORDER BY ${sort} ASC`)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
module.exports = Product