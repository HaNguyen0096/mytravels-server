module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://traveler@localhost/mytravels',
  TEST_DATABASE_URL: process.env.TEST_DDATABASE_URL || 'postgresql://traveler@localhost/mytravels-test',
}
