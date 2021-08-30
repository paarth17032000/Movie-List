import './App.css';
import axios from 'axios'
import {useEffect} from 'react'

function App() {

  useEffect( async () => {
    let res = await axios.get('http://localhost:5050/api/genre')
    console.log(res)
  }, [])

  return (
    <div className="App">
      HELLO
    </div>
  );
}

export default App;
