require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
console.log(mongoose.version)

const MongoURI = process.env.MONGODB_URI


if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [name] [number]')
  process.exit(1)
};

const password = process.argv[2]

if (!password || password.length < 3) {
  console.log('Password should be at least 3 characters long')
  process.exit(1)
}

if (process.argv.length === 3) {
  console.log('Phonebook:')
  mongoose.set('strictQuery',false)
  mongoose.connect(MongoURI)
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5) {
  mongoose.set('strictQuery',false)
  mongoose.connect(MongoURI)
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log('Saved person:', result) // Logs the saved document
    mongoose.connection.close()
  })

}


