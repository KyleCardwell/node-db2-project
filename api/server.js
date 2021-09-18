const express = require("express")

const carsRoutes = require('./cars/cars-router')

const server = express()

server.use(express.json());
server.use('/api/cars', carsRoutes);

server.use('*', (req, res) => {

    res.status(404).json({
        message: 'somethin aint workin'
    })
})

module.exports = server
