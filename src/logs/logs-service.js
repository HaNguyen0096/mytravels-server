const xss = require('xss')
const Treeize = require('treeize')

const logsService = {
  getAllLogs(knex) {
    return knex
      .select(
        'logs.id',
        'logs.latitude',
        'logs.longitude',
        'logs.date_created',
        'logs.description',
        'logs.image',
        'logs.public',
        'logs.rating',
        'logs.title',
        'logs.visited_day',
        ...userFields,
      )
      .from('logs')
      .leftJoin(
        'users AS usr',
        'logs.user_id',
        'usr.id',
      )
      
  },

  getPublicLogs(knex){
    return knex
      .select(
        'logs.id',
        'logs.latitude',
        'logs.longitude',
        'logs.date_created',
        'logs.description',
        'logs.image',
        'logs.public',
        'logs.rating',
        'logs.title',
        'logs.visited_day',
        ...userFields,
      )
      .from('logs')
      .leftJoin(
        'users AS usr',
        'logs.user_id',
        'usr.id',
      )
      .where('logs.public', true)
  },

  getLogsForUser(knex, user_id){
    return knex
      .select(
        'logs.id',
        'logs.latitude',
        'logs.longitude',
        'logs.date_created',
        'logs.description',
        'logs.image',
        'logs.public',
        'logs.rating',
        'logs.title',
        'logs.visited_day',
        ...userFields,
      )
      .from('logs')
      .leftJoin(
        'users AS usr',
        'logs.user_id',
        'usr.id',
      )
      .where('usr.id', user_id)
  },

  getById(knex, id) {
    return logsService.getAllLogs(knex)
      .where('logs.id', id)
      .first()
  },

  insertLog(knex, newLog) {
    return knex
      .insert(newLog)
      .into('logs')
      .returning('*')
      .then(([log]) => log)
      .then(log => logsService.getById(knex, log.id))
  },
  deleteLog(knex, id) {
    return knex('logs')
      .where({ id })
      .delete()
  },
  updateLog(knex, id, newLogFields) {
    return knex('logs')
      .where({ id })
      .update(newLogFields)
  },
  serializeLogs(logs) {
    return logs.map(this.serializeLog)
  },
  serializeLog(log) {
    const logTree = new Treeize()

    const logData = logTree.grow([ log ]).getData()[0]

    return {
      id: logData.id,
      title: xss(logData.title),
      content: xss(logData.content),
      latitude: xss(logData.latitude),
      longitude: xss(logData.longitude),
      description: xss(logData.description),
      public: logData.public,
      date_created: logData.date_created,
      image: logData.image,
      rating: logData.rating,
      visited_day: logData.visited_day,
      user: logData.user || {},
    }
  },
}



const userFields = [
  'usr.id AS user_id',
  'usr.user_name AS user_name',
  'usr.full_name AS full_name',
]

module.exports = logsService