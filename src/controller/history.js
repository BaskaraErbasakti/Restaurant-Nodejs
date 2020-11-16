const model = require("../model/history")
const history = {}

history.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

history.add = async (req, res) => {
    try {
        const {cashier, date, orders, amount} = req.body
        const data = await model.Add(cashier, date, orders, amount)
        return res.send('data berhasil ditambah').send(data)
    } catch (error) {
        return res.send('data gagal ditambah').send(error)
    }
}

history.edit = async (req, res) => {
    try {
        const { invoices, cashier, date, orders, amount} = req.body
        const data = await model.Edit(invoices, cashier, date, orders, amount)
        return res.send('data berhasil diubah').send(data)
    } catch (error) {
        return res.send('data gagal diubah').send(error)
    }
}

history.delete = async (req, res) => {
    try {
        const {orders} = req.body
        const data = await model.Delete(orders)
        return res.send('data berhasil dihapus').send(data)
    } catch (error) {
        return res.send('data gagal dihapus').send(error)
    }

}

module.exports = history