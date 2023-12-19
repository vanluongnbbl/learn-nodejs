const fs = require('fs')
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}

const bookJson = JSON.stringify(book)


const dataBuffer = fs.readFileSync('1-json.json')
let newData = JSON.parse(dataBuffer.toString())
newData.name = "Luong"
newData.age = 25

const myInfo = JSON.stringify(newData)

fs.writeFileSync('1-json.json', myInfo)