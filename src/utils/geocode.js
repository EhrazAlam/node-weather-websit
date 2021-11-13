const request = require('request')

const geocode = (address, callback) => {
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWhyYXoiLCJhIjoiY2t1YmVpdzBsMDFpdjJucGhxOHJyYW9kdiJ9.ud-piunNBpisxq8LEvzaEQ&limit=1'

      request({ url, json: true }, (error, response) => {

            if (error) {
                  callback('Unable to connect to Address Look Up .', undefined)
            }
            else if (response.body.features.length === 0) {
                  callback('Unable to find Address . Please provide a valid address .', undefined)
            }
            else {
                  callback(undefined, {
                        longitude: response.body.features[0].center[0],
                        latitude: response.body.features[0].center[1],
                        location: response.body.features[0].place_name
                  })
            }
      })
}

module.exports = geocode

//https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWhyYXoiLCJhIjoiY2t1YmVpdzBsMDFpdjJucGhxOHJyYW9kdiJ9.ud-piunNBpisxq8LEvzaEQ&limit=1

// const addressURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWhyYXoiLCJhIjoiY2t1YmVpdzBsMDFpdjJucGhxOHJyYW9kdiJ9.ud-piunNBpisxq8LEvzaEQ&limit=1"

// request({ url: addressURL, json: true }, (error, response) => {

//       if(error)
//       {
//             Console.log("Unable to connect to Address Look Up")
//       }
//       else
//       {
//       const longitude = response.body.features[0].center[0]
//       const latitude = response.body.features[0].center[1]
//       console.log(latitude,longitude)
//       } 
// })