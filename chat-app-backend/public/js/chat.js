const socket = io()

socket.on('countUpdated', (count = 0) => {
    console.log('The count has been updated!', count)
})


document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})


socket.on('message', (message) => {
  if (typeof message === 'function') return
  console.log(message)
})

const form = document.getElementById('form');
const input = document.getElementById('inputChat');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (input.value) {
    const message = input.value
    socket.emit('chat message', message, (error) => {
      if (error) {
        return console.log(error)
      }

      console.log('Message delivered')
    });
    input.value = '';
  }
});


document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('send-location', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, (error) => {
      if (error) {
        return console.log(error)
      }

      console.log('Location delivered')
    })
  })
})

socket.on('location', (location) => {
  if (typeof location === 'function') return
  console.log(location)
})
