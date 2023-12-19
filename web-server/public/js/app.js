console.log('Client side javascript file is loaded')


fetch('https://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log('data', data)
    })
}).catch(error => {
    console.log(error)
})



const userForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('location', location);

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '...'
    fetch(`http://localhost:3000/users?address=${location}`).then((res) => {
        res.json().then((users) => {
            console.log('users', users)
            messageOne.textContent = ''
            messageTwo.textContent = users.name
        })
    }).catch(error => {
        console.log(error)
    })
})