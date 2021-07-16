const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2ltYWhhcmZpIiwiYSI6ImNrcjNqbTQ0cjBydG8zMXB0dW55Zzc0eXoifQ.nOtrbYPl8vDvDddsWrBinQ&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!')
        } else if (body.features.length === 0) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

