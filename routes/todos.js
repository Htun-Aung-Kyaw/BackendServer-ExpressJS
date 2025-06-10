var express = require('express');
var router = express.Router();
var todos = require('../controllers/TodosController');

router.get('/', todos.getTodos);

router.get('/:todoId', todos.getTodoById);

router.post('/', todos.saveTodo);

router.put('/:todoId', todos.updateTodo);

router.delete('/:todoId', todos.deleteTodo);

module.exports = router;