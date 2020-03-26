const moment = require('moment-timezone')

function cleanTables(db) {
  return db.raw(
    `TRUNCATE logs RESTART IDENTITY CASCADE`
  )
}

function makeLog(){
  const time = '2020-03-18T07:55:12.825Z'
  return [
    {
      id: 1,
      latitude: '42.3554',
      longitude: '-71.0640',
      title: 'Boston Common',
      description: 'This is a beautiful place',
      image: 'https://en.wikipedia.org/wiki/File:Aerial_View_Parkman_Bandstand_at_Boston_Common.jpg',
      rating: 10,
      visited_day: time,
      public: false,
      date_created: time,
    },
  ]
}

function makeLogsArray(){
  const time = '2020-03-18T07:55:12.825Z'
  return [
    {
      id: 1,
      latitude: '42.3554',
      longitude: '-71.0640',
      title: 'Boston Common',
      description: 'This is a beautiful place',
      image: 'https://en.wikipedia.org/wiki/File:Aerial_View_Parkman_Bandstand_at_Boston_Common.jpg',
      rating: 10,
      visited_day: time,
      public: false,
      date_created: time,
    },
    {
      id: 2,
      latitude: '48.8584',
      longitude: '2.2945',
      title: 'Eiffel Tower',
      description: 'The tower is so tall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
      rating: 10,
      visited_day: time,
      public: true,
      date_created: time
    },
  ]
}


module.exports = {
  cleanTables,
  makeLog,
  makeLogsArray,
}