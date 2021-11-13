const request = require('request')

const forecast = (longitude, latitude, callback) => {
      const url = 'http://api.weatherstack.com/current?access_key=9efa1b283723130ee28e28b1a3d6f90e&query=' + longitude + ',' + latitude

      request({ url , json: true }, (error, response) => {
            if (error) {
                  callback('Unable to connect to weather service.', undefined)
            }
            else if (response.body.error) {
                  callback('Unable to find location', undefined)
            }
            else {
                  callback(undefined, "The current weather shows " + response.body.current.weather_descriptions[0] + " , The temperature is currently " + response.body.current.temperature +" and it feels like " + response.body.current.feelslike + " . ");

                  //console.log(response.body.current)
                  //     callback(undefined, 
                  //           {
                  //                 description: response.body.current.weather_descriptions[0],
                  //                 temperature: response.body.current.temperature,
                  //                 feelslike: response.body.current.feelslike
                  //           }
                  //     )
            }
      })
}

module.exports = forecast

//callback(undefined, console.log("The current weather is " + response.body.current.weather_descriptions[0] + "The temperature is currently " + response.body.current.temperature +"And it feels like " + response.body.current.feelslike));
