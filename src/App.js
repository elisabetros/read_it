import React from 'react';
import './App.css';
import axios from 'axios'
const apiCred = require('./config/api')



console.log(apiCred.key)

const App = () => {
  async function fetch(){

    const response = await axios(`https://www.googleapis.com/books/v1/volumes?q=&keys:${apiCred.key}`)
    console.log(response.data.items)
  }
  fetch()
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
