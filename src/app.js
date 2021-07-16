const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Kim Aharfi Shalti'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kim Aharfi Shalti'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kim Aharfi Shalti',
        helpText: 'Some helpful text'
    })
})

app.get('', (req, res) => {
    res.send('<h1>weather<h1>')
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide search term'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        //forecastData object return from geocode with latitude, longitude and location
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
            })

        })
    })

})

app.get('/products' , (req , res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
       product: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Kim Aharfi Shalti',
        errorMessage: 'Help not Found'

    })
})


app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Kim Aharfi Shalti',
        errorMessage: 'About not Found'

    })
})


//have to be last
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Kim Aharfi Shalti',
        errorMessage: 'Page not Found'

    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})



//example
//domain : app.com -- root
//other pages: app.com/help   app.com/about
