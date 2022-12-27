import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  // get all todo
  const [todos, setTodos] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/getTodos')
      const result = response.data
      setTodos(result.graphql)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>Todo!</h1>

      {/* form */}
      <form className='form' action="">
        <div className="form__flex">
          <label htmlFor="ftitle">Todo</label>
          <input className='form__input' type="text" name="ftitle" id="ftitle" />
        </div>
        <div className="form__flex">
          <input type="checkbox" name="fcomplete" id="fcomplete" />
          <label htmlFor="fcomplete">Complete</label>
          <input className='form__save form__input' type="submit" value="Save" />
        </div>
      </form>

      {/* display all todo */}
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <p>
              <input checked={todo.completed ? true : false} type="checkbox" name="" id="" />
              {todo.title}
              <button className='list__delete'>X</button>
            </p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
