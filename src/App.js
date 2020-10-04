import React,{useState, useCallback, useEffect} from 'react';

import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([])

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value)
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault()
    if(!newTodo.trim()) return;
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos
    ]);
    setNewTodo('')
  }, [newTodo, todos]);

  useEffect(()=> {
    console.log(todos)
  }, [todos]);

  const addTodo = useCallback((todo, index)=> (event)=> {
    const newTodos = [...todos]
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    const updateAll = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updateAll)
  }, [todos]);

  return (
    <div>
      <h1>Your List</h1>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a To-do:</label>
        <input
          id="newTodo"
          name="newTodo" 
          value={newTodo} 
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
        <button onClick= {markAllDone}>Mark all done</button>
      </form>
      <ul>
        {todos.map((todo, index)=> (
          <li key={todo.id} >
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <input
              checked={todo.done} 
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <button onClick={removeTodo(todo)}>Delete Todo</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
