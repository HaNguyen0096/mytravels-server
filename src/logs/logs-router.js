const express = require('express')
const logsService = require('./logs-service')
const path = require('path')
const jsonParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')


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

  .post(requireAuth, jsonParser, (req, res, next) => {
    const {latitude, longitude, title, description, image, public, rating, visited_day } = req.body
    const newLog = {latitude, longitude, title, description, public, image, rating, visited_day }
    const checkReqKey = {latitude, longitude, title, description, public, rating, visited_day }
    for (const [key, value] of Object.entries(checkReqKey))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newLog.user_id = req.user.id

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

logsRouter
  .route('/publiclogs')
  .get((req, res, next) => {
    logsService.getPublicLogs(
      req.app.get('db')
    )
      .then(logs => {
        res.json(logs)
      })
      .catch(next)
  })

logsRouter
  .route('/userlogs')
  .all(requireAuth)
  .get((req, res, next) => {
    logsService.getLogsForUser(
      req.app.get('db'), req.user.id
    )
      .then(logs => {
        res.json(logs)
      })
      .catch(next)
  })

logsRouter
  .route('/:log_id')
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    logsService.getById(knexInstance, req.params.log_id)
      .then(log => {
        if (!log) {
          return res.status(404).json({
            error: { message: `Log doesn't exist` }
          })
        }
        res.json(log)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    logsService.deleteLog(
      req.app.get('db'),
      req.params.log_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = logsRouter