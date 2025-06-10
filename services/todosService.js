const Todos = require("../model/todosModel");
// let todos = [
//     {
//         id: 1,
//         title: 'Task1'
//     },
//     {
//         id: 2,
//         title: 'Task2'
//     },
//     {
//         id: 3,
//         title: 'Task3'
//     }
// ];

async function getAllTodos()
{
    let todos = await Todos.find({});
    if(!todos.length) throw new Error('No todos found');
    return todos;
}

async function getTodoById(id)
{
    console.log('todoId',id);
    let todo;
    todo = await Todos.findById(id);
    return todo;
}
async function saveTodo(todo)
{
    let newToDo = new Todos(todo);
    return newToDo.save(); //save to mongodb
}
async function updateTodo(todoId, todo)
{
    console.log("Update Todo:", todoId,"with", todo);
    let updateTodo;
    updateTodo = await Todos.findByIdAndUpdate(todoId, todo, {new: true});
    return updateTodo;
}
async function deleteTodo(todoId)
{
    console.log("Delete TodoId:", todoId);
    let todo = await Todos.findById(todoId);
    if(!todo)
    {
        throw new Error('Todo Id not found');
    }
    else
    {
        console.log("Deleted todo:", todo);
    }
    let deleteTodo;
    deleteTodo = await Todos.findByIdAndDelete(todoId);
    return deleteTodo;
}
module.exports = {
    getAllTodos,
    getTodoById,
    saveTodo,
    updateTodo,
    deleteTodo,
}