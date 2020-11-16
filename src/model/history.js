const database = require("../config/database")
const history = {}

history.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM public.history ORDER BY date ASC ")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

history.Add = (cashier, date, orders, amount) => {
    database
        .query(`INSERT INTO public.history(cashier, date, orders, amount) VALUES ('${cashier}', '${date}', '${orders}', ${amount})`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di tambah"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

history.Edit = (invoices, cashier, date, orders, amount) => {
    database
        .query(`UPDATE public.history SET cashier='${cashier}', date='${date}', orders='${orders}', amount=${amount} WHERE invoices=${invoices};`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di update"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

history.Delete = (orders) => {
    database
        .query(
            `DELETE FROM public.history WHERE orders='${orders}';`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di hapus"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

module.exports = history