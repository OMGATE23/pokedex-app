import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import "./PokemonList.css";

export default function PokemonList({ pokemons }) {
  const [sprite, setSprite] = useState([]);
  const [pokeURL, setPokeURL] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (pokemons) {
      displaySprite();
        }
  }, [pokemons]);

  async function displaySprite() {
    let listOfSprites = [];
    for (let i = 0; i < pokemons.length; i++) {
      const res = await axios.get(pokemons[i].url);
      
      const value = res.data.sprites.front_default;

      listOfSprites.push(value);
      
    }
    setSprite(listOfSprites);
  }


  return (
    <div>
      
      <div className="pokemon-grid">
          
        {pokemons &&
          pokemons.map((pokemon, length) => (
          <div className="pokemon-div" key={pokemon.name} onClick = {() => {
            setPokeURL(pokemon.url)
            setName(pokemon.name)
            setShowModal(true)
            }} >   

            <img src = {sprite[length]}/>
            <div>{pokemon.name}</div>
            
          </div>
        ))}            
      </div>

      {showModal && <Modal pokemonName = {name} pokeURL = {pokeURL} setShowModal = {setShowModal}/>}


      
    </div>
  );
}
