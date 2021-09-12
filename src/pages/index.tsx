import { useEffect, useState } from 'react';
import api from '../services/api';

import Head from 'next/head';

import { FaPen, FaTrash, FaCheck } from 'react-icons/fa';

import styles from './teams.module.scss';
interface PokemonInterface {
  id: string;
  name: string;
  sprite: string;
}

export default function Home() {
  // estado para armazenar cada pokemon acesados pelo endpoint /pokemon/${pokemonName.name}
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  // estado para armazenar equipes de pokemons
  const [pokemonsTeam, setPokemonsTeam] = useState([]);
   
  // ordenando os pokemons
  const OrderPokemons = (pokemons: any) => pokemons.sort((pokemonA: any, pokemonB: any) => (pokemonA.id > pokemonB.id) ? 1 : -1);
  
  // função para chamar cada pokemon no endpoint /pokemon/${nomeDoPokemon}
  // usando os nomes que estão no estado de pokemonsName como argumento e
  // armazenando cada pokemon no estado de pokemons 
  async function loadPokemons() {
    const pokemonsNames = await api
      .get(`/pokemon`)
      .then(response => response.data.results);

    for (const pokemonName of pokemonsNames) {
      await api.get(`/pokemon/${pokemonName.name}`)
      .then(response => setPokemons(oldState => [...oldState, response.data]))

      // ordenando os pokemons
      await OrderPokemons(pokemons)
    }
  }
  
  useEffect( () =>  {
    loadPokemons();
  }, [])

  function addPokemonsToTheTeam(event: any) {
    event.preventDefault();

    setPokemonsTeam(event.currentTarget)
    console.log(pokemonsTeam)
  }
    
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
              { pokemonsTeam ? ( 
                <div className={styles.pokemonTeamItem}>
                  <div className={styles.pokemonTeamPokeball}>
                    <img src="pokeball-background-top.svg"  alt="" />
                    <img src="pokeball-background-bottom.svg" alt="" />

                    <div className={styles.pokemonInTeamPokeball}>
                      <img className={styles.pokemonInTeamPokeballImage} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' alt="" />
                    </div>
                  </div>
                </div> ) : (
                
                <div className={styles.pokemonTeamItem}>
                  <img src="pokeball-background-top.svg"  alt="" />
                  <img src="pokeball-background-bottom.svg" alt="" />
                </div>
              )}
              { pokemonsTeam ? ( 
                <div className={styles.pokemonTeamItem}>
                  <div className={styles.pokemonTeamPokeball}>
                    <img src="pokeball-background-top.svg"  alt="" />
                    <img src="pokeball-background-bottom.svg" alt="" />

                    <div className={styles.pokemonInTeamPokeball}>
                      <img className={styles.pokemonInTeamPokeballImage} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' alt="" />
                    </div>
                  </div>
                </div> ) : (
                
                <div className={styles.pokemonTeamItem}>
                  <img src="pokeball-background-top.svg"  alt="" />
                  <img src="pokeball-background-bottom.svg" alt="" />
                </div>
              )}
              { pokemonsTeam ? ( 
                <div className={styles.pokemonTeamItem}>
                  <div className={styles.pokemonTeamPokeball}>
                    <img src="pokeball-background-top.svg"  alt="" />
                    <img src="pokeball-background-bottom.svg" alt="" />

                    <div className={styles.pokemonInTeamPokeball}>
                      <img className={styles.pokemonInTeamPokeballImage} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' alt="" />
                    </div>
                  </div>
                </div> ) : (
                
                <div className={styles.pokemonTeamItem}>
                  <img src="pokeball-background-top.svg"  alt="" />
                  <img src="pokeball-background-bottom.svg" alt="" />
                </div>
              )}

              
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
                <div onClick={addPokemonsToTheTeam} key={pokemon.id} className={styles.pokemonItem}>
                  <div className={styles.pokemonId}><span>{pokemon.id}</span></div>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}  alt="" />
                  <h3>{pokemon.name}</h3>
                  <div className={`${styles.pokemonBar} ${styles.pokemonBarColor}`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
