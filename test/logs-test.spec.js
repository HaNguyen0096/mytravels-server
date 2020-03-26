const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Log Endpoint`, function(){
  let db
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => helpers.cleanTables(db))

  afterEach('cleanup',() => helpers.cleanTables(db))

  describe(`GET /api/logs`, () => {
    context(`Given no log`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/logs')
          .expect(200, [])
      })
    })
    context('Given there are logs in the database', () => {
      const testLog=helpers.makeLog()
      beforeEach('insert logs', () => {
        return db.into('logs').insert(testLog)
      })
  
      it('GET /api/logs responds with 200 and all of the logs', () => {
        return supertest(app)
          .get('/api/logs')
          .expect(200)
          .expect(res => {
            expect(res.body[0].latitude).to.eql(testLog[0].latitude)
            expect(res.body[0].longitude).to.eql(testLog[0].longitude)
            expect(res.body[0].title).to.eql(testLog[0].title)
            expect(res.body[0].description).to.eql(testLog[0].description)
            expect(res.body[0].image).to.eql(testLog[0].image)
            expect(res.body[0].rating).to.eql(testLog[0].rating)
            const expect_visited_day = new Date('2020-03-18T07:55:12.825Z').toLocaleDateString()
            const actual_visited_day = new Date(res.body[0].visited_day).toLocaleDateString()
            expect(actual_visited_day).to.eql(expect_visited_day)
            expect(res.body[0].public).to.eql(testLog[0].public)
            const expect_date_created = new Date('2020-03-18T07:55:12.825Z').toLocaleDateString()
            const actual_date_created = new Date(res.body[0].date_created).toLocaleDateString()
            expect(actual_date_created).to.eql(expect_date_created)
          })
      })
    })
  })

  describe(`POST /api/logs`, () => {
    before('clean the table', () => helpers.cleanTables(db))

    context('Insert logs', () => {
      it(`create new log, response with 201 and the new log`, () => {
        const newLog = {
          latitude: '42.3554',
          longitude: '-71.0640',
          title: 'Boston Common',
          description: 'This is a beautiful place',
          image: 'https://en.wikipedia.org/wiki/File:Aerial_View_Parkman_Bandstand_at_Boston_Common.jpg',
          rating: 10,
          visited_day: '2020-03-18T07:55:12.825Z',
          public: false,
        }
        return supertest(app)
          .post('/api/logs')
          .send(newLog)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.latitude).to.eql(newLog.latitude)
            expect(res.body.longitude).to.eql(newLog.longitude)
            expect(res.body.title).to.eql(newLog.title)
            expect(res.body.description).to.eql(newLog.description)
            expect(res.body.image).to.eql(newLog.image)
            expect(res.body.rating).to.eql(newLog.rating)
            expect(res.body.public).to.eql(newLog.public)
            const expect_visited_day = new Date(newLog.visited_day).toLocaleDateString()
            const actual_visited_day = new Date(res.body.visited_day).toLocaleDateString()
            expect(actual_visited_day).to.eql(expect_visited_day)
          })
      })
    })
  })

  describe(`DELETE /api/logs/:log_id`, () => {
    before('clean the table', () => helpers.cleanTables(db))
    context('Given there are logs in database', () => {
      const testLog=helpers.makeLogsArray()    
      beforeEach('insert logs', () => {
        return db.into('logs').insert(testLog)
      }) 
      it('remove log by id', () => {
        const idToRemove = 1
        const expectedLogs = testLog.filter(log => log.id !== idToRemove)
        return supertest(app)
          .delete(`/api/logs/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
            .get('/api/logs')
            .expect(expectedLogs)
            )
      })
    })
  })

})

