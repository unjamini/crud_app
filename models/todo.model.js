const filename = '../data.json'
let todos = require(filename)
const helper = require('../helpers/helper.js')


function getTodos() {
    return new Promise((resolve, reject) => {
        if (todos.length === 0) {
            reject({
                message: 'Todo list is empty',
                status: 202
            })
        }
        resolve(todos)
    })
}

function getTodo(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todos, id)
        .then(todo => resolve(todo))
        .catch(err => reject(err))
    })
}

function addTodo(newTodo) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(todos) }
        newTodo = { ...id, ...newTodo, isDone: false }
        todos.push(newTodo)
        helper.writeJSONFile(filename, todos)
        resolve(newTodo)
    })
}

function updateTodo(id, isDone) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todos, id)
        .then(todo => {
            const index = todos.findIndex(p => p.id == todo.id)
            id = { id: todo.id } 
            todos[index] = { ...todos[index], isDone }
            helper.writeJSONFile(filename, todos)
            resolve(todos[index])
        })
        .catch(err => reject(err))
    })
}

function deleteTodo(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todos, id)
        .then(() => {
            todos = todos.filter(p => p.id != id)
            helper.writeJSONFile(filename, todos)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    getTodos,
    getTodo,
    addTodo, 
    updateTodo,
    deleteTodo
}