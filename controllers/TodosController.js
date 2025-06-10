const todosService = require('../services/todosService');

async function getTodos(req, res, next)
{
    try {
        let todos = await todosService.getAllTodos();
        res.json(todos);
    }
    catch(err) {
        console.log(err);
        res.status(404).json(err.toString());
    }
}

async function getTodoById(req, res, next)
{
    console.log("Get with todoId", req.params.todoId)
    let id = req.params['todoId'];
    try{
        let todo = await todosService.getTodoById(id);
        if(todo)
        {
            res.status(200).json(todo);
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }
}

async function saveTodo(req, res, next)
{
    console.log("Save todo", req.body)
    let todo = req.body;
    try{
        let newTodo = await todosService.saveTodo(todo);
        if(newTodo)
        {
            res.status(201).json(newTodo);
        }
    }
    catch(err){
        res.status(400).json(err.toString());
    }
}

async function updateTodo(req, res, next)
{
    // await sleep(3);
    let todoId = req.params['todoId'];
    let todo = req.body;

    try{
        let updateTodo = await todosService.updateTodo(todoId, todo);
        if (updateTodo)
        {
            res.status(200).json(updateTodo);
        }
    }
    catch(err){
        res.status(400).json(err.toString())
    }
}
// for sever delay simulation
async function sleep(time)
{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        }, time*1000);
    })
}
async function deleteTodo(req, res, next)
{
    await sleep(3); //sever delay 3seconds
    let todoId = req.params['todoId'];
    try{
        let deleteTodo = await todosService.deleteTodo(todoId);
        if(deleteTodo)
        {
            res.status(200).json(deleteTodo);
        }
    }
    catch(err){
        console.log(err.toString());
        res.status(400).send(err.toString());
    }
}

module.exports = {
    getTodos,
    getTodoById,
    saveTodo,
    updateTodo,
    deleteTodo,
    sleep,
};