const config = require('./utils/config')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')
const weatherRouter = require('./Controllers/weatherRoutes')
const loginRouter = require('./Controllers/loginRoutes')
const userRouter = require('./Controllers/userRoutes')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) =>  {
        logger.error('error connecting to MongoDB', error.message)
    })

// middleware
app.use(cors())
app.use(express.json())// parses incoming requests with JSON payloads
app.use('/api/weather', middleware.tokenExtractor)

//app.use('/api/weather', weatherRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
