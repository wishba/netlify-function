import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

function App() {

  // test hello world!
  const [message, setMessage] = useState()
  const fetchData = async () => {
    const result = await axios.get('/.netlify/functions/helloWorld')
    setMessage(result.data.message)
  }
  useEffect(() => {
    fetchData()
  }, [])

  // get all todo
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get('/api/getTodos')
        const result = response.data
        setTodos(result.graphql)
      } catch (error) {
        setError(error)
      }

      setLoading(false)
    }

    fetchData()
  }, [])
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="App">

      {/* test hello world! */}
      <h1>{message}</h1>

      {/* form */}
      <form className='form' action="">
        <div className="form__flex">
          <label htmlFor="ftitle">Todo</label>
          <input className='form__input' type="text" name="ftitle" id="ftitle" />
        </div>
        <div className="form__flex">
          <input className='form__check' type="checkbox" name="fcomplete" id="fcomplete" />
          <label htmlFor="fcomplete">Complete</label>
          <input className='form__submit form__input' type="submit" value="Save" />
        </div>
      </form>

      {/* display all todo */}
      <h2>Todo!</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title} ({todo.completed ? 'completed' : 'incomplete'})
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
