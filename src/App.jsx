import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import { useState, useEffect } from "react"

 function App() {

  const [todos, setTodos] = useState([])
  const [ todoValue, setTodoValue ] = useState("");

  function persistTodos(newList) {
    localStorage.setItem('todos', JSON.stringify({todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    setTodos(newTodoList)
    persistTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    setTodos(newTodoList)
    persistTodos(newTodoList)
  }

  function handleUpdateTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(()=>{
    if (!localStorage) return;

    let localTodos = localStorage.getItem('todos');

    if (!localTodos) return;
    
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos);

  }, [])

  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue} />
      <TodoList handleDeleteTodo={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo} todos={todos}/>
    </>
  )
}

export default App
