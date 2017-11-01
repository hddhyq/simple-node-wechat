import mongoose from 'mongoose'

const url = "mongodb://127.0.0.1:27017/test1"

mongoose.connect(url, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', (err) => {
  if (err) {
    console.log(err)
  }
})

db.once('open', () => {
  console.log('opened')
})

export default db
