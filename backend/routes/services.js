const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET services for org
router.get('/', (req, res, next) => {
  services
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
})

// POST new client
router.post('/', (req, res, next) => {
  const newService = req.body
  newService.org = org
  services.create(newService, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT update service
router.put('/update/:id', (req, res, next) => {
  const newService = req.body
  newService.org = org
  services.findByIdAndUpdate(req.params.id, newService, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router
