const request = require('request')


const getForecast = (latitude,longtitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9568fdca4efdd9a8ea4d35fb51f4a59e&query=' + latitude + ',' +longtitude;

    request({ url, json: true}, (error, {body}) => {

        if(error){
            callback('Unable to connect to weather service!') 
        }else if(body.error){
            callback('Unable to find location')
        }
        else{
            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% change of rain`)
        }
    }) 
}


module.exports = getForecast;