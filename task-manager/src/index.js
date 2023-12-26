const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests qre disabled')
//     } else {
//         next()
//     }
// })


app.use((req, res, next) => {
    res.status(503).send('Website is maintaining...')
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port );
})

const jwt = require('jsonwebtoken')

const mF = async () => {
   
    const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', { expiresIn: '7 days' })
    console.log('token', token);

    const data = jwt.verify(token, 'thisismycourse')
    console.log('data', data);
}   

mF()