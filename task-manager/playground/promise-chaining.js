require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('65816e53c7a4e37335dc49a9', { age: 1}).then(user => {
//     console.log('user', user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('65816e53c7a4e37335dc49a9', 0).then(res => {
    console.log('res', res)
}).catch(e => {
    console.log(e);
})
