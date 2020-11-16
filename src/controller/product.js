const model = require("../model/product")
const redis = require("../config/redis")
const respone = require('../helpers/respon')
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("productAll", 30, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.add = async (req, res) => {
    try {

        if (req.file === undefined) {
            return res.status(500).json(req.file)
        } else if ( req.body == undefined){
            return res.json('REQ BODY TIDAK MASUK')
        }
        const datas = {
            name: req.body.name,
            price: req.body.price,
            images: req.file.path,
            category: req.body.category,
        }
        const data = model.Add(datas)
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

Product.edit = async (req, res) => {
    try {
        const { id, name, stok, price, images } = req.body
        const data = await model.Edit(id, name, stok, price, images)
        return res.send('data berhasil diubah').send(data)
    } catch (error) {
        return res.send('data gagal diubah')
    }
}

Product.delete = async (req, res) => {
    try {
        const data = await model.Delete(req.body.name)
        console.log(req.body.name)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }

}

Product.search = async (req, res) => {
    try {
        const name = req.query.name
        const data = await model.search(name)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.send('Yang anda cari ga ada bos!!')
        }
    } catch (error) {
        return res.send('Gagal dalam pencarian')
    }
}

Product.sort = async (req, res) => {
    try {
        const sort = req.params.sort
        const data = await model.sort(sort)
        return res.send(data)
    } catch (error) {
        res.send('Gagal dalam mengurutkan')
    }
}

module.exports = Product