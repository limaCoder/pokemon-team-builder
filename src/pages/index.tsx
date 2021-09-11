import { useEffect, useState } from 'react';
import api from '../services/api';

import Head from 'next/head';

import { FaPen, FaTrash, FaCheck } from 'react-icons/fa';

import styles from './teams.module.scss';

interface PokemonNameInterface {
  name: string;
}

interface PokemonInterface {
  id: string;
  name: string;
  sprite: string; 
}

export default function Home() {
  // estado para armazenar os nomes de pokémons acessados pelo endpoint /pokemon
  const [pokemonsName, setPokemonsName] = useState<PokemonNameInterface[]>([]);

  // estado para armazenar cada pokemon acesados pelo endpoint /pokemon/${pokemonName.name}
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  // função para realizar fetch na API do Pokémon e armazernar os nomes no estado
  // PokemonsName (array)
  function loadPokemonsNames() {
    api.get(`/pokemon?limit=${5}`) // limitando a busca para 5
    .then(response => setPokemonsName(response.data.results))
  }
   
  // função para chamar cada pokemon no endpoint /pokemon/${nomeDoPokemon}
  // usando os nomes que estão no estado de pokemonsName como argumento e
  // armazenando cada pokemon no estado de pokemons 
  function loadPokemons() {
    loadPokemonsNames();
    
    let newPokemons: any = []

    for (const pokemonName of pokemonsName) {
      api.get(`/pokemon/${pokemonName.name}`)
        .then(response => newPokemons.push(response.data))
        console.log(pokemons)
    }

    console.log(newPokemons)
    setPokemons(newPokemons)
  }
    
  function testPokemons(){
    pokemons.map(pokemon => {
      console.log(pokemon)
    })
  }
  
  useEffect( () =>  {
    loadPokemons();
    testPokemons();
  }, [])
    
    
  return (
    <>
      <Head>
        <title>Create new team | Pokemon Team Builder</title>
      </Head>

      <main className={styles.mainContainer}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>My Team</h2>
            <FaPen className={styles.sectionTitleIcon} />
          </div>

          <div className={styles.pokemonTeam}>
            <div className={styles.pokemonTeamRow}>
              <div className={styles.pokemonTeamItem}>
                <img src="pokeball-background-top.svg"  alt="" />
                <img src="pokeball-background-bottom.svg" alt="" />
              </div>
              <div className={styles.pokemonTeamItem}>
                <img src="pokeball-background-top.svg"  alt="" />
                <img src="pokeball-background-bottom.svg" alt="" />
              </div>
              <div className={styles.pokemonTeamItem}>
                <img src="pokeball-background-top.svg"  alt="" />
                <img src="pokeball-background-bottom.svg" alt="" />
              </div>
            </div>
            <div className={styles.pokemonTeamRow}>
              <div className={styles.pokemonTeamItem}>
                <img src="pokeball-background-top.svg"  alt="" />
                <img src="pokeball-background-bottom.svg" alt="" />
              </div>
              <div className={styles.pokemonTeamItem}>
                <img src="pokeball-background-top.svg"  alt="" />
                <img src="pokeball-background-bottom.svg" alt="" />
              </div>
              <div className={styles.pokemonTeamItem}>
                <img src="pokeball-background-top.svg"  alt="" />
                <img src="pokeball-background-bottom.svg" alt="" />
              </div>
            </div>
            <div className={styles.teamOptions}>
              <div className={styles.trashIcon}>
                <FaTrash size={26} />
              </div>
              <div className={styles.checkIcon}>
                <FaCheck size={26} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>Choose 6 Pokémons:</h2>
          </div>

          <div className={styles.pokemons}>
            <div className={styles.pokemonsRow}>
              {pokemons.map(pokemon => (
                <div key={pokemon.id} className={styles.pokemonItem}>
                  <div className={styles.pokemonId}>{pokemon.id}</div>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}  alt="" />
                  <h3>{pokemon.name}</h3>
                  <div className={styles.pokemonBar}></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
