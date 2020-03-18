
const logsService = {

  getAllLogs(knex) {
    return knex.select('*').from('logs')
  },

  getById(knex, id) {
    return knex.from('logs').select('*').where('id', id).first()
  },

  insertLog(knex, newLog) {
    return knex
      .insert(newLog)
      .into('logs')
      .returning('*')
      .then(([log]) => log)
      .then(log => logsService.getById(knex, log.id))
  },
}

module.exports = logsService