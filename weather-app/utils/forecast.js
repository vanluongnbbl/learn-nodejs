const request = require('request')

const getUsers = (latitude, longtitude, callback) => {
    const url = 'https://jsonplaceholder.typicode.com/users'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

getUsers(undefined, undefined, (undefined, users) => {
    console.log('users', users)
})

module.exports = getUsers