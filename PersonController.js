require('./Person')
const addPerson = (data)=>{
    let person = new Person(data);
    return person.save();
}

const removePerson = (personid)=>{
    Person.deleteOne({id: personid})
}
const updatePerson = (personid, data)=>{
    Person.updateOne({id: personid}, data)
}
const getPerson = (personid)=>{
    return Person.find({id: personid})
}
const getAllPerson = ()=>{
    return Person.find({})
    
}

export {addPerson, removePerson, updatePerson, getAllPerson, getPerson}