const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config()
const serveStatic = require('serve-static')
mongoose.set('useFindAndModify', false);
morgan.token('body', function (req, res) { return JSON.stringify(req.body)
 })

var uniqueValidator = require('mongoose-unique-validator');

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else{
    return response.status(500).send(error)
  }

  next(error)
}

app.use(errorHandler)
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req, res)
    ].join(' ')
  }))

app.use(serveStatic('build'))

const url = process.env.URL || "mongodb://localhost:27017/Person"
mongoose.connect(url, { useNewUrlParser: true })
.then(result => {    console.log('connected to MongoDB')  })
.catch((error) => {    console.log('error connecting to MongoDB:', error.message)  });

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    date: Date,
    number: { type: Number, required: true, unique: true },
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  personSchema.plugin(uniqueValidator);
const Person = mongoose.model('Person', personSchema)

const addPerson = (data)=>{
    let person = new Person(data);
    return person.save();
}

const removePerson = (personid)=>{
    return Person.findByIdAndRemove(personid)
}
const updatePerson = (searchParams, data)=>{
    return Person.updateOne(searchParams, data).exec()
}
const updatePersonById = (personid, data)=>{
  return Person.findByIdAndUpdate(personid, data, { new: true }).exec()
}
const getPersonById = (personid)=>{
    return Person.findById(personid).exec()
}
const getPerson = (search)=>{
  return Person.findOne(search).exec()
}
const getAllPerson = ()=>{
    return Person.find({})
    
}

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons' , (req,res) =>{
    getAllPerson().then(results => res.json(results))

});

app.get('/info', (req, res)=>{
    let currenttime = new Date()
    res.send(`<p>Phonebook has info for ${Person.count()} people</p>` +
    `<div>${currenttime}</div>`);


})

app.get('/api/persons/:id', (req,res,next)=>{
    const id = req.params.id
    if(mongoose.Types.ObjectId.isValid(id)){
      getPersonById(id).then(results =>res.json(results)).catch(error=>{next(error)})
    }
    else{
      res.status(403).json("bad id")
    }
});

app.put('/api/persons/:id', (req,res,next)=>{
  const id = req.params.id
  let newInfo = req.body;

  if(mongoose.Types.ObjectId.isValid(id)){
    updatePersonById(id, newInfo).then(results =>res.json(results)).catch(error=>{next(error)})
  }
  else{
    res.status(403).json("bad id")
  }
});

app.delete('/api/persons/:id', (req,res,next)=>{
    const id = req.params.id
    removePerson(id).then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    
});

app.post('/api/persons', (req,res,next)=>{
    let newPerson = req.body;
    getPerson({name: newPerson.name}).then((result)=>{
      if(result){
        res.status(400).json(`${newPerson.name} already existed`).end()
      }
      else if(!newPerson.name || !newPerson.number){
        res.status(400).json(`Name or Number is empty`).end()
      }
      addPerson(newPerson).then(result=>res.status(200).json(result)).catch(error=>{res.status(500).json(error)});

    }).catch(error=>{
      console.log(error)
      next(error)
    })
 
});
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })