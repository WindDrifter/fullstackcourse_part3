const mongoose = require('mongoose')


const url = "localhost:27017"
mongoose.connect(url, { useNewUrlParser: true })
.then(result => {    console.log('connected to MongoDB')  })
.catch((error) => {    console.log('error connecting to MongoDB:', error.message)  });

const personSchema = new mongoose.Schema({
    name: String,
    date: Date,
    number: Boolean,
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  const Person = mongoose.model('Person', personSchema)

  export default Person;