const db = require('../../data/db-config')
const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  
  try {

    const carId = await Cars.getById(req.params.id)

    if(!carId) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found`})
    } else {
      req.car = carId
      next()
    }

  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  const missing = {
    status: 400,
    message: ''
  }

  if (!vin) {
    missing.message = `vin is missing`
    res.json(missing)
  } else if (!make) {
    missing.message = `make is missing`
    res.json(missing)
  } else if (!model) {
    missing.message = `model is missing`
    res.json(missing)
  } else if (!mileage) {
    missing.message = `mileage is missing`
    res.json(missing)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isVinValid = vinValidator.validate(req.vin)
  console.log(isVinValid)
  if (!isVinValid) {
    res.status(400).json({ message: `vin ${req.vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {

  try {
    
    const vinToCheck = await db('cars')
      .where('vin', req.body.vin.trim())
      .first()

      if(vinToCheck) {
        next({status: 400, message: `vin ${req.body.vin} already exists` })
      } else {
        next()
      }

  } catch (err) {
    next(err)
  }
}


module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique}