const Person = require('./models/person');
console.log(Person)
const express = require('express');
const app = express();

var morgan = require('morgan');

app.use(express.static('dist'));


morgan.token('body', (req) => JSON.stringify(req.body))  // Custom token to log request body and jsonify it

app.use(morgan(':method :url :status :response-time ms :body', {
    skip: (req) => req.method !== 'POST'  // Skip logging if method is NOT POST
}))


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', async(req,res, next) => {
    try{
        const persons = await Person.find({})
        res.json(persons)
    } catch (error) {
        // console.log(error)
        // res.status(400).send({error: 'malformatted id'})
        next(error);
    }
})

app.get('/api/info', async(req, res, next) => {
    const date = new Date()
    const Count = await Person.countDocuments()
    res.send(`
    <p>Phonebook has info for ${Count} people</p>
    <p>${date}</p>`)
});

app.get('/api/persons/:id', async(req, res, next) => {
    const id = req.params.id
    const person = await Person.findById(id)
    try {
        if (person){
            res.json(person)
        }else{
            res.status(404).end()
        }

    }catch (error) {
        // console.log(error)
        // res.status(400).send({error: 'malformatted id'})
        next(error);
    }

})


app.delete('/api/persons/:id', async(req, res, next) => {
    
    try{
        const id = req.params.id
        await Person.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        // console.log(error)
        // res.status(400).send({error: 'malformatted id'})
        next(error);
    }


    

})

app.use(express.json())

app.post('/api/persons', async(req, res, next) => {
    try{
        const newPerson = await new Person(req.body).save()
        res.json(newPerson)
    } catch (error) {
        next(error);
    }
})
app.put('/api/persons/:id', async(req, res, next) => {
    const id = req.params.id
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    try{
        const updatedPerson = await Person.findByIdAndUpdate(id, person, {new: true})
        res.json(updatedPerson)
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).send({error: error.message})
    }
    else {
        res.status(400).json({error: error.message}||{error: 'Something went wrong'})
    }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
