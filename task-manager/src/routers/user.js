const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const sharp = require('sharp')
const multer = require('multer')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((err) => {
    //     res.status(400).send()
    // })
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users', auth,  async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({error: 'Invalid updates!'})

    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne({ _id: req.user._id })
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const storage = multer.memoryStorage()
const upload = multer ({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be a jpg, jpeg or png'))
        }

        // if (!file.originalname.match(/\.(doc|docx)$/)) {
        //     return cb(new Error('please upload a Word document'))
        // }
        cb(undefined, true)
    },
    storage
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()


    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (error) {
        res.status(404).send()
    }
})


module.exports = router