const request = require('request')
const forecast = require('./utils/forecast')
const url ='https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'

request({ url: url }, (error, res) => {
    const data = JSON.parse(res.body)
    const temperature = data.current.temperature_2m
    const wind_speed = data.current.wind_speed_10m

    console.log(`It is currently ${temperature} degrees out. And wind speed is ${wind_speed}`)

})

const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%2OAngeles.json?access_token=pk.eyJ1IjoiYW5kcmV3bWhZDEiLCJhIjoiY2pzbml20G92MGN2MTQOcGd3bjVheTFuayJ9.hbZJE6qEZHEsL5QXVF4vtw'

request({ url: mapURL }, (error, res) => {
    const data = JSON.parse(res)
    if (error) {
        console.log('error', error)
    }
    console.log('data', data)

})

// forecast