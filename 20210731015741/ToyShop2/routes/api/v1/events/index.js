const express = require('express')
const router = express.Router()
const { Event } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const events = await Event.findAll()

  res.send(events)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const event = await Event.findOne({ where: { id } })

  res.send(event)
})

router.post('/', auth, async function (req, res, next) {
  const event = await Event.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(event)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Event.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const event = await Event.findOne({ where: { id } })

  event.name = req.body.name

  event.date = req.body.date

  event.price = req.body.price

  event.save()

  res.send(event)
})

module.exports = router
