import React, { useEffect } from 'react'
import './App.css';
import {useState} from 'react'

import axios from 'axios';
import Pagination from './Pagination.js'
import PokemonList from "./PokemonList.js"


function App() {
  const [pokemons, setPokemons] = useState([])
  const [pageURL, setPageURL] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageURL, setNextPageURL] = useState()
  const [prevPageURL, setPrevPageURL] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    let cancel
    axios.get(pageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setLoading(false)
      setNextPageURL(res.data.next)
      setPrevPageURL(res.data.previous)
      setPokemons(res.data.results.map(p => (p)))})

      return () => cancel()
      
  }, [pageURL])

  function gotoNextPage(){
    setPageURL(nextPageURL)
  }
  

  function gotoPrevPage(){
    setPageURL(prevPageURL)
  }
  return (
    <div className="App">

      <header>

        <h1>PokeDex</h1>

      </header>
      <Pagination 
          gotoNextPage = {nextPageURL ? gotoNextPage: null}
          gotoPrevPage = {prevPageURL ? gotoPrevPage: null}
        />
      {loading && <div>Loading...</div>}
        <PokemonList pokemons = {pokemons}/>

      <footer>
      <div class="footer-title-div">
            Contact Me
        </div>

        <div class="footer-list-div">
            <ul>
                <li><a href="https://github.com/OMGATE23"><i class="fa-brands fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/om-gate-68a5a3201/"><i class="fa-brands fa-linkedin"></i></a></li>
                <li><a href="https://twitter.com/om_gate"><i class="fa-brands fa-twitter"></i></a></li>
            </ul>
        </div>
      </footer>
        
    </div>


  );

  
}

export default App;
