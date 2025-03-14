const express = require('express')
const app = express()
var morgan = require('morgan')
// const cors = require('cors')
app.use(express.static('dist'))
let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body))  // Custom token to log request body and jsonify it

app.use(morgan(':method :url :status :response-time ms :body', {
    skip: (req) => req.method !== 'POST'  // Skip logging if method is NOT POST
}))


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req,res) => {
    res.json(notes)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`
    <p>Phonebook has info for ${notes.length} people</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    }else {
        res.status(404).end()

    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()

})
const generateId = () => {
    return(Math.random(1,10000).toString())
}
app.use(express.json())

const validatePerson = (req,res,next) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({error: 'name or number missing'})
        }
    if (notes.find(note => note.name === body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }
    next()
}
app.post('/api/persons',validatePerson, (req, res) => {
    const body = req.body
    body.id = generateId()
    notes = notes.concat(body)
    res.json(body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
