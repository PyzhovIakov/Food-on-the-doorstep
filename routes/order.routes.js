const { Router } = require('express')
const Order = require('./../models/Order')
const User = require('./../models/User')
const { check, validationResult } = require('express-validator')
const { orderUpdateCheck } = require('./../check/checkOrder')
const router = Router()

router.get('', async (req, res) => {
    try {
        const order = await Order.find().populate('listProducts.product').populate('userId')

        res.json(order)
    }
    catch (e) {
        res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const order = await Order.find({ userId: userId }).sort({ "dateOrder": -1 }).populate('listProducts.product').populate('userId')
        if (order.length == 0) {
            res.status(404).json({ error: 'Данных нет' })
        } else {
            res.json(order[0])
        }

    }
    catch (e) {
        res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
    }
})

router.post('', [check('deliveryAddress', 'Введите адрес').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }

            const userId = req.body.userId
            const user = await User.findById(userId)

            let fullname = ""
            if (!user) {
                fullname = req.body.fullname
            } else {
                await User.updateOne({ _id: userId }, {
                    basket: [],
                    deliveryAddress: req.body.deliveryAddress
                })
                fullname = user.fullname
            }

            const dateOrder = new Date()
            dateOrder.setHours(dateOrder.getHours() + 3)
            const dateDelivery = new Date()
            dateDelivery.setHours(dateDelivery.getHours() + 6)

            const listProducts = []
            for (let i = 0; i < req.body.listProducts.length; i++) {
                listProducts.push({ product: req.body.listProducts[i].product._id, count: req.body.listProducts[i].count })
            }

            const doc = new Order({
                userId: req.body.userId,
                listProducts: listProducts,
                status: "Новый",
                fullname: fullname,
                dateOrder: dateOrder,
                dateDelivery: dateDelivery,
                deliveryAddress: req.body.deliveryAddress
            })

            await doc.save()

            res.json({ message: 'Успешно' })
        } catch (e) {
            res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
        }
    }
)

router.patch('/:id', orderUpdateCheck, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const orderId = req.params.id
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ error: 'Такого заказа нет' })
        }

        await Order.updateOne({ _id: orderId }, {
            status: req.body.status,
            dateDelivery: req.body.dateDelivery
        })
        res.json({ message: "Успешно" })

    }
    catch (e) {
        res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const orderId = req.params.id

        await Order.findOneAndDelete({ _id: orderId })

        res.json({ message: "Успешно" })

    }
    catch (e) {
        res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
    }
})

module.exports = router