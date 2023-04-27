const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { charts } = require('../models/models')


// POST chart data, allows postman to send data 
router.post('/', async (req, res, next) => {
  try {
    const chartData = req.body;
    chartData.org = org;

    const updatedChartData = await charts.findOneAndUpdate(
      { org: chartData.org, zipCode: chartData.zipCode },
      { $inc: { clientCount: 1 }, $set: { org: chartData.org, zipCode: chartData.zipCode } },
      { upsert: true, new: true }
    );

    res.json(updatedChartData);
  } catch (error) {
    return next(error);
  }
});

// GET all chart data and populates on dashboard
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