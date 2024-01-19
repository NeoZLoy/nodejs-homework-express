const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();


const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('/public'))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 3001;
const urlDb = process.env.DB_HOST;

const server = app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

module.exports = { app, server };

mongoose
  .connect(urlDb)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));