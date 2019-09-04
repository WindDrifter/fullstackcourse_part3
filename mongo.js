const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]
const url = "mongodb://localhost:27017/Person"

mongoose.connect(url, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })
  
  const Person = mongoose.model('Person', personSchema)

const addPerson = (data)=>{
    let person = new Person(data);
    return person.save();
}

const getAllPerson = ()=>{
    return Person.find({})
    
}
if ( process.argv.length>3 ) {
    const data = {name: process.argv[3], number: process.argv[4]}
    addPerson(data).then(result=>{
        mongoose.connection.close()

    })
}
else{
    getAllPerson().then(results=>{
        console.log("Phonebook")
        allPerson = results.map(result => console.log(`${result.name} ${result.number}`))
        mongoose.connection.close()

    });

}
