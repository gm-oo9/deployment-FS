require('dotenv').config({ path: '../.env' })
const MongoURI = process.env.MONGODB_URI
const mongoose = require('mongoose')

mongoose.connect(MongoURI).then(() => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'User name required']
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
