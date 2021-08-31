import './App.css';
import axios from 'axios'
import {useEffect, useState} from 'react'

function App() {

  const [details, setDetails] = useState({
    genre: '',
    actors: '',
    rating: '',
    movie: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await axios.post('http://localhost:5050/api/genre', {
      genre: details.genre,
      actors: details.actors,
      rating: details.rating,
      movie: details.movie
    })
    console.log(res)
  }

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  useEffect( async () => {
    let res = await axios.get('http://localhost:5050/api/genre')
    console.log(res)
  }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}><br /><br />
        <input name="genre" type="text" onChange={handleChange}/><br /><br />
        <input name="actors" type="text" onChange={handleChange}/><br /><br />
        <input name="rating" type="text" onChange={handleChange}/><br /><br />
        <input name="movie" type="text" onChange={handleChange}/><br /><br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
