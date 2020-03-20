
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
  deleteLog(knex, id) {
    return knex('logs')
      .where({ id })
      .delete()
  },
  updateLog(knex, id, newLogFields) {
    return knex('logs')
      .where({ id })
      .update(newLogFields)
  }
}

module.exports = logsService