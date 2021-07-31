const express = require('express')
const router = express.Router()

const toysRouter = require('./toys')
router.use('/toys', toysRouter)

const eventsRouter = require('./events')
router.use('/events', eventsRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
