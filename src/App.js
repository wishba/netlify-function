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
      <p>{message}</p>
    </div>
  );
}

export default App;
