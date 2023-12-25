// CRUD

const { ObjectId, MongoClient } = require('mongodb-legacy')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()

MongoClient.connect(connectionURL, {}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)


    db.collection('tasks').deleteOne({
        _id: new ObjectId('65816278655f0a0d33e16dcc')
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error);
    })

    // db.collection('tasks').updateMany({
    //     completed: true
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // })


    // db.collection('users').updateOne({
    //     _id: new ObjectId('65813e721609343c1b95a71c')
    // }, {
    //     $set: {
    //         name: 'Huhu Boy'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').insertOne({
    //     name: 'Luong',
    //     age: 25
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.insertedId)
    // })

    //   db.collection('users').findOne({
    //     _id: new ObjectId('65813e721609343c1b95a71c'),
    // }, (err, user) => {
    //     if (err) {
    //         return console.log('Unable to find user')
    //     }

    //     console.log(user)
    // })


    // db.collection('users').find({ age: 25 }).toArray((err, user) => {
    //     if (err) {
    //         return console.log('Unable to find user')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 25 }).count((err, count) => {
    //     if (err) {
    //         return console.log('Unable to find count')
    //     }

    //     console.log(count)
    // })

    //       db.collection('tasks').insertOne({
    //         description: 'Lau nha',
    //         completed: true
    // }, (err, task) => {
    //     if (err) {
    //         return console.log('Unable to find task')
    //     }

    //     console.log(task)
    // })


    //   db.collection('tasks').findOne({
    //     _id: new ObjectId('658143ef1058a01a5f134360'),
    // }, (err, task) => {
    //     if (err) {
    //         return console.log('Unable to find task')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: true }).toArray((err, task) => {
    //     if (err) {
    //         return console.log('Unable to find task')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: true }).count((err, count) => {
    //     if (err) {
    //         return console.log('Unable to find count')
    //     }

    //     console.log(count)
    // })


})