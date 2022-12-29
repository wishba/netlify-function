import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/.netlify/functions/getTodos')
        const todos = await response.json()
        setTodos(todos)

      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  function handleCheck() {
    console.log('check')
  }

  return (
    <div className='app'>
      <div>
        <h1>todo!</h1>
        <ul className='list'>
          {todos.map((todo) => (
            <li
              className='list__todo'
              key={todo._id}
            >
              <input
                className='list__checkbox'
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheck}
              />
              <p className='list__title'>{todo.title}</p>
              <button className='list__button'>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
