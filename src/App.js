import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([])

  const loadTodos = async () => {
    try {
      const response = await fetch('/.netlify/functions/getTodos')
      const todos = await response.json()
      setTodos(todos)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const [title, setTitle] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const body = { title }

    try {
      await fetch('/.netlify/functions/createTodo', {
        method: 'POST',
        body: JSON.stringify(body)
      })

      loadTodos()

    } catch (error) {
      console.error(error);
    }
  }

  const checkTodo = async (todo) => {
    console.log(todo)

  }

  const deleteTodo = async (todo) => {
    try {
      await fetch('/.netlify/functions/deleteTodo', {
        method: 'DELETE',
        body: JSON.stringify({ id: todo._id })
      })

      loadTodos()

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='app'>
      <div>
        <h1>todo!</h1>

        <form
          className='form'
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="title">Activity:</label>
            <input
              className='form__fill'
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="complete">Completed:</label>
            <input className='form__fill' type="checkbox" name="complete" id="complete" />
          </div>
          <input type="submit" value="todo" />
        </form>

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
                onChange={() => checkTodo(todo)}
              />
              <p className='list__title'>{todo.title}</p>
              <button
                className='list__button'
                onClick={() => deleteTodo(todo)}
              >delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
