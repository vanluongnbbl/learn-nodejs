const https = require('https');
const url = 'https://jsonplaceholder.typicode.com/users'

const request = https.request(url, (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data = data + chunk.toString()
    })
    res.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console('An error', error)
})
request.end()