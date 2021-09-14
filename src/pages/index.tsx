import Head from "next/head";
import { useEffect, useState } from "react";

import { PokemonItem } from "../components/PokemonItem";
import { PokemonTeam } from "../components/PokemonTeam";
import { TeamOptions } from "../components/TeamOptions";

import api from "../services/api";
import server from "../services/backend";

import { FaPen } from "react-icons/fa";
import styles from "./teams.module.scss";
import { ModalComponent } from "../components/Modal";

interface PokemonInterface {
  id: number;
  name: string;
  types: any;
  onAddPokemonToTheTeam: (pokemon: any) => void;
}

export default function Home() {
  // estado para armazenar cada pokemon acesados pelo endpoint /pokemon/${pokemonName.name}
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  // estado para armazenar equipes de pokemons
  const [pokemonsTeam, setPokemonsTeam] = useState<PokemonInterface[]>([]);

  // estado para armazenar valor booeleano do modal, se está abertou não
  const [modalIsOpen, setIsOpen] = useState(false);

  // estado para armazenar nome da equipe
  const [teamName, setTeamName] = useState('')

  // ordenando os pokemons
  const OrderPokemons = (pokemons: any) =>
    pokemons.sort((pokemonA: any, pokemonB: any) =>
      pokemonA.id > pokemonB.id ? 1 : -1
    );


  // função para chamar cada pokemon no endpoint /pokemon/${nomeDoPokemon}
  // usando os nomes que estão no estado de pokemonsName como argumento e
  // armazenando cada pokemon no estado de pokemons
  async function loadPokemons() {
    const pokemonsNames = await api
      .get(`/pokemon?limit=151`)
      .then((response) => response.data.results);

    for (const pokemonName of pokemonsNames) {
      await api
        .get(`/pokemon/${pokemonName.name}`)
        .then((response) =>
          setPokemons((oldState) => [...oldState, response.data])
        );

      // ordenando os pokemons
      await OrderPokemons(pokemons);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, []);


  // função para adicionar pokémons a equipe
  function addPokemonsToTheTeam(pokemon: any) {
    if (pokemonsTeam.length >= 6) return;

    const checkIfPokemonAlreadyExist = pokemonsTeam.find(item => item.id === pokemon.id);

    if(checkIfPokemonAlreadyExist) return;

    setPokemonsTeam([...pokemonsTeam, pokemon]);
  }

  let group = Array.from({ length: 6 });

  function handleDeletePokemon() {
    setPokemonsTeam([])
  }

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setIsOpen(false)
  }

  // função para enviar dados dos pokemons para o backend
  async function sendPokemonData(e: any) {
    e.preventDefault();

    const pokemonsData  =  pokemonsTeam.map(pokemon => ( { id: pokemon.id, name: pokemon.name, type: pokemon.types[0].type.name } ))

    const data = {teamName, pokemonsData}

    console.log(data)

    try {
      const response = await server.post('/create-pokemons-team', JSON.stringify(data))
    } catch (err) {
      console.log(err)
      alert('Erro ao enviar dados')
    }
  }

  return (
    <>
      <Head>
        <title>Create new team | Pokemon Team Builder</title>
      </Head>

      <main className={styles.mainContainer}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>{ teamName ? (teamName) : ('My Team') }</h2>
            <FaPen onClick={openModal} className={styles.sectionTitleIcon} />
          </div>

          <ModalComponent 
            isOpen={modalIsOpen} 
            onRequestClose={closeModal}
            onInputChangeModal={e => setTeamName(e.target.value)}
            onSubmitModal={handleSubmit} 
          />

          <div className={styles.pokemonTeam}>
            <div className={styles.pokemonTeamRow}>
              {group.map((pokemonGroup, index) => (
                <PokemonTeam
                  index={pokemonsTeam[index]}
                  id={pokemonsTeam[index] ? pokemonsTeam[index].id : 0}
                  pokemonType={pokemonsTeam[index] ? pokemonsTeam[index].types[0].type.name : ''}
                />
                ))}
            </div>
            { pokemonsTeam.length < 6 ? (
              <TeamOptions
                opacity={0.2}
              />
            ) : (
              <TeamOptions
                opacity={1}
                onDeletePokemon={handleDeletePokemon}
                onSendPokemonData={sendPokemonData}
              />
            ) }
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>Choose 6 Pokémons:</h2>
          </div>

          <div className={styles.pokemons}>
            <div className={styles.pokemonsRow}>
              {pokemons.map((pokemon, index) => (
                <PokemonItem
                  id={pokemon.id}
                  name={pokemon.name}
                  onAddPokemonToTheTeam={() => addPokemonsToTheTeam(pokemon)}
                  pokemonTeam={pokemonsTeam.length}
                  pokemonType={pokemon.types[0].type.name}
                />
              ))}
              <div id="morePokemons"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
