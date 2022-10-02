import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Modal.css'

export default function Modal({pokemonName, pokeURL, setShowModal}) {
  const [pokeData, setPokeData] = useState({})

    async function getData(){
        const res= await axios.get(pokeURL)
        const value = res.data

        setPokeData({
            id: value.id,
            imgSrc: value.sprites.front_default,
            hp : value.stats[0].base_stat,
            attack : value.stats[1].base_stat,
            defense : value.stats[2].base_stat,
            special_attack : value.stats[3].base_stat,
            special_defense : value.stats[4].base_stat,
            speed :value.stats[5].base_stat
        })     
    }

    useEffect(() => {
        getData()
    }, [pokeURL])
  
  
  return (
    <div>
      <div className='modal-backdrop' onClick={() => setShowModal(false)}></div>
      <div className='modal' >
          <div className='pokemon-data'>
              <img src= {pokeData.imgSrc}></img>
              <div>Pokemon Name:  <span>{pokemonName}</span></div>
              <div>Pokemon ID: {pokeData.id}</div>
              <div>HP : <span>{pokeData.hp}</span></div>
              <div>Attack : <span>{pokeData.attack}</span></div>
              <div>Defense : <span>{pokeData.defense}</span></div>
              <div>Special Attack : <span>{pokeData.special_attack}</span></div>
              <div>Special Defense : <span>{pokeData.special_defense}</span></div>
              <div>Speed : <span>{pokeData.speed}</span></div>
          </div>
          <button className='modal-button' onClick = {() => {setShowModal(false)}}>X</button>
      </div>
    </div>
  )
}
