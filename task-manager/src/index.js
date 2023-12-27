const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     res.status(503).send('Website is maintaining...')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port );
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('658b888d9322d9b333a78325')
    // await task.populate('owner')
    // console.log('tsss',task.owner)

    const user = await User.findById('658aa5835c650eece0b489e9')
    await user.populate('tasks')
    console.log('user', user.tasks)
}

main()