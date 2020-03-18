const express = require('express')
const logsService = require('./logs-service')
const path = require('path')
const jsonParser = express.json()


const logsRouter = express.Router()

logsRouter
  .route('/')
  .get((req, res, next) => {
    logsService.getAllLogs(
      req.app.get('db')
    )
      .then(logs => {
        res.json(logs)
      })
      .catch(next)
  })

  .post(jsonParser, (req, res, next) => {
    const {latitude, longitude, title, description, image, rating } = req.body
    const newLog = { latitude, longitude, title, description, image, rating }
    for (const [key, value] of Object.entries(newLog))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    logsService.insertLog(
      req.app.get('db'),
      newLog
    )
      .then(log => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${log.id}`))
          .json(log)
      })
      .catch(next)
  })

module.exports = logsRouter