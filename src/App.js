import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState('text')

  const fetchData = async () => {
    const result = await axios.get('/.netlify/functions/helloWorld')
    setMessage(result.data.message)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>{message}</h1>
      <form className='form' action="">
        <div className="form__flex">
          <label htmlFor="ftitle">Todo</label>
          <input className='form__input' type="text" name="ftitle" id="ftitle" />
        </div>
        <div className="form__flex">
          <input type="radio" name="fcomplete" id="fcomplete" />
          <label htmlFor="fcomplete">Complete</label>
          <input className='form__submit form__input' type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
}

export default App;
