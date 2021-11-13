const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../tempelate/views')
const partialsPath = path.join(__dirname, '../tempelate/partials')

//SetUp static directory to serve
app.use(express.static(publicDirectoryPath))

//SetUp handler view and engine 
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (request, response) => {
    response.render('index',
        {
            title: 'Weather App',
            name: 'Ehraz'
        })
})

app.get('/about', (request, response) => {
    response.render('about',
        {
            title: 'About',
            name: 'Ehraz'
        })
})

app.get('/help', (request, response) => {
    response.render('help',
        {
            title: 'Help',
            message: 'Please contact ehrazalam08@gmail.com',
            name: 'Ehraz'
        })
})

app.get('/weather', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'Please provide the search City'
        })
    }

    // console.log(request.query.search)
    // response.send({
    //     forecast: '20 Degree',
    //     place: 'Patna',
    //     searchAddress: request.query.search
    // })

    // const address = process.argv[2]

    geocode(request.query.search, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return response.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return response.send({error})
            }
            // console.log(location)
            // console.log(forecastData)

            response.send({
                forecast: forecastData,
                place: location,
                searchAddress: request.query.search
            })
        })
    })

})

app.get('/help/*', (request, response) => {
    response.render('error',
        {
            title: '404',
            name: 'Ehraz',
            message: '404 - Help Page Not Found .',
        })
})

app.get('*', (request, response) => {
    response.render('error',
        {
            title: '404',
            name: 'Ehraz',
            message: '404 - Page Not Found .',
        })
})


app.listen(3000, () => {
    console.log('Server port is up and running on 3000 .')
})