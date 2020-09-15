const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../Models/User')

userRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    if(body.password.length < 3){
        return response.status(400).json({error: 'password too short'})
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    await response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({})

    await response.json(users)
})

module.exports = userRouter