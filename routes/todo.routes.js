const express = require('express')
const router = express.Router()
const todo = require('../models/todo.model.js')
const m = require('../helpers/middleware')
module.exports = router


router.get('/', async (req, res) => {
    await todo.getTodos()
    .then(todos => res.json(todos))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await todo.getTodo(id)
    .then(todo => res.json(todo))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

router.post('/', m.checkFields, async (req, res) => {
    await todo.addTodo(req.body)
    .then(todo => res.status(201).json({
        message: `The todo with ${todo.id} is added`,
        content: todo
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

router.put('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await todo.updateTodo(id, req.body)
    .then(todo => res.json({
        message: `The ${id} todo status is updated`,
        content: todo
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    
    await todo.deleteTodo(id)
    .then(todo => res.json({
        message: `The ${id} todo was deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})