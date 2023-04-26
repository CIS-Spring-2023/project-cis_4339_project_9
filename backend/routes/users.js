const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

// importing data model schemas
const { users } = require('../models/models')

// GET users for an org
router.get('/', (req, res, next) => {
  const org = process.env.ORG // Assuming that org is defined in environment variables
  users.find({ org: org }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
})
// POST a new user
router.post('/register', (req, res, next) => {
  const newUser = req.body

  // Hash the password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }

    newUser.password = hash
    users.create(newUser, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
})

// POST login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  // Find the user by username
  users.findOne({ username }, (error, user) => {
    if (error) {
      return next(error)
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Compare the provided password with the stored hash
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return next(err)
      }

      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      // Successful login, return user data
      res.json({ isAllowed: true, name: user.username, role: user.role })
    })
  })
})

module.exports = router
