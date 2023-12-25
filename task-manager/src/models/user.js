const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        minLength: 6,
        trim: true,
        required: true,
        validate(value) {
            if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('Password should not contain password!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }
    }
})

module.exports = User

// const me = new User({
//     name: 'HEHE huhu    ',
//     age: 18,
//     email: '    hehehuhu@gmail.com',
//     password: 'passwsord1111'
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((err) => {
//     console.log('Error!', err);
// })