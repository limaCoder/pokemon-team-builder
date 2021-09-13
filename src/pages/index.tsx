import Head from "next/head";
import { useEffect, useState } from "react";

import { PokemonItem } from "../components/PokemonItem";
import { PokemonTeam } from "../components/PokemonTeam";
import { TeamOptions } from "../components/TeamOptions";

import api from "../services/api";
import Modal from 'react-modal';

import { FaPen } from "react-icons/fa";
import styles from "./teams.module.scss";

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

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);


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
      .get(`/pokemon`)
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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
      <Head>
        <title>Create new team | Pokemon Team Builder</title>
      </Head>

      <main className={styles.mainContainer}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>My Team</h2>
            <FaPen onClick={openModal} className={styles.sectionTitleIcon} />
          </div>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            <button onClick={closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
            </form>
          </Modal>

          <div className={styles.pokemonTeam}>
            <div className={styles.pokemonTeamRow}>
              {group.map((pokemonGroup, index) => (
                <PokemonTeam
                  index={pokemonsTeam[index]}
                  id={pokemonsTeam[index] ? pokemonsTeam[index].id : 0}
                  // @ts-ignore
                  pokemonType={pokemonsTeam[index] ? pokemonsTeam[index].types[0].type.name : ''}
                />
                ))}
            </div>
            { pokemonsTeam.length < 6 ? (
              <TeamOptions
                opacity={0.2}
                onDeletePokemon={handleDeletePokemon}
              />
            ) : (
              <TeamOptions
                opacity={1}
                onDeletePokemon={handleDeletePokemon}
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
                  pokemonTeam={pokemonsTeam}
                  pokemonType={pokemon.types[0].type.name}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
