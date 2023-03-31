const { Router } = require('express')
const Site = require('../models/Site')
const router = Router()

router.get('/:name', async (req, res) => {
    try {
        const name = req.params.name
        const siteComponent = await Site.findOne({ name: name })
        if (siteComponent.length == 0) {
            res.status(404).json({ error: 'Данных нет' })
        } else {
            res.json(siteComponent)
        }
    }
    catch (e) {
        res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
    }
})

router.post(
    '',
    async (req, res) => {
        try {
            const doc = new Site({
                name: req.body.name,
                value: req.body.value
            })
            await doc.save()
            res.json({ message: 'Успешно' })
        } catch (e) {
            res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
        }
    }
)

router.patch('/:name', async (req, res) => {
    try {

        const name = req.params.name
        const component = await Site.findOne({ name: name })
        if (!component) {
            return res.status(404).json({ error: 'Компонента нет' })
        }

        await Site.updateOne({ name: name }, {
            name:name,
            value: req.body.value
        })
        
        res.json({ message: "Успешно" })

    }
    catch (e) {
        res.status(500).json({ error: 'Что-то пошло не так, попробуйте ещё раз.' })
    }
})


module.exports = router