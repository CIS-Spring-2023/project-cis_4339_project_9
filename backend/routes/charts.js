const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { charts } = require('../models/models')


// POST new client
router.post('/', (req, res, next) => {
    const newChart = req.body
    newChart.orgs = [org]
    charts.create(newChart, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// GET 10 most recent clients for org
router.get('/', (req, res, next) => {
    charts
      .find({ orgs: org }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.json(data)
        }
      })
  })
  module.exports = router