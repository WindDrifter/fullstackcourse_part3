const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body)
 })
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

app.use(express.static('build'))



app.use(bodyParser.json())
var persons = [
    {name: "aaa", number: "1231241", id: 1},
    {name: "bbb", number: "1230000", id: 2},
    {name: "ccc", number: "1231111", id: 3},
    {name: "ddd", number: "1232222", id: 4},
    {name: "eee", number: "1233333", id: 5}]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons' , (req,res) =>{
    res.json(persons)

});

app.get('/info', (req, res)=>{
    let currenttime = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>` +
    `<div>${currenttime}</div>`);


})

app.get('/api/persons/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    let found = findAPersonBy(id);
    return found? res.json(found): res.status(404).json("data not found").end()

});

app.delete('/api/persons/:id', (req,res)=>{
    const prevLength = persons.length;
    const id = parseInt(req.params.id)
    const result = persons.filter(person => person.id !== id)
    persons = [...result]

    return result.length===prevLength? res.status(404).json("data not found").end(): res.json("removed")
    
    
});

function findAPersonBy(id){
    let found = persons.find(function(person) {
        return person.id === id
      });
    return found;
}

function findAPersonName(name){
    let found = persons.find(function(person) {
        return person.name === name
      });
    return found;
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
app.post('/api/persons', (req,res)=>{
    let person = req.body;
    if(findAPersonName(person.name)){
        res.status(400).json(`${person.name} already existed`).end()
    }
    else if(!person.name || !person.number){
        res.status(400).json(`Name or Number is empty`).end()

    }
    let id = -1;
    let found = true;
    while(found){
        id = getRandomInt(99999999);
        found = findAPersonBy(id);
    }
    person.id = id;
    persons.concat(person);
    
    res.status(200).json(person)
});
  app.get('/notes', (req, res) => {
    res.json(notes)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })