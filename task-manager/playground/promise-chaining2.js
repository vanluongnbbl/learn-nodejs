require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndUpdate('65816f8ca7dfb8207f1be6ac', { completed: true }).then(task => {
//     console.log(task)

//     return Task.countDocuments({ completed: false })
// }).then(res => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)

    return await Task.countDocuments()
}

deleteTaskAndCount('65816f8ca7dfb8207f1be6ac').then(res => {
    console.log('res >>>', res)
}).catch(e => {
    console.log(e);
})