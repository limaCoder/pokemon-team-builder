import Head from "next/head";
import { useEffect, useState } from "react";

import { PokemonItem } from "../components/PokemonItem";
import { PokemonTeam } from "../components/PokemonTeam";
import { TeamOptions } from "../components/TeamOptions";

import api from "../services/api";

import { FaPen } from "react-icons/fa";
import styles from "./teams.module.scss";

interface PokemonInterface {
  id: number;
  name: string;
  onAddPokemonToTheTeam: (pokemon: any) => void;
}

export default function Home() {
  // estado para armazenar cada pokemon acesados pelo endpoint /pokemon/${pokemonName.name}
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);

  // estado para armazenar equipes de pokemons
  const [pokemonsTeam, setPokemonsTeam] = useState<PokemonInterface[]>([]);

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
    /* setToogle((pokemonClick) => !pokemonClick); */

    if (pokemonsTeam.length >= 6) return;

    setPokemonsTeam([...pokemonsTeam, pokemon]);
    console.log(pokemonsTeam)
  }

  let group = Array.from({ length: 6 });


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
              {group.map((pokemonGroup, index) => (
                <PokemonTeam
                  index={pokemonsTeam[index]}
                  id={pokemonsTeam[index] ? pokemonsTeam[index].id : 0}
                />
              ))}
            </div>
            <TeamOptions />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>Choose 6 Pokémons:</h2>
          </div>

          <div className={styles.pokemons}>
            <div className={styles.pokemonsRow}>
              {pokemons.map((pokemon) => (
                <PokemonItem
                  id={pokemon.id}
                  name={pokemon.name}
                  onAddPokemonToTheTeam={() => addPokemonsToTheTeam(pokemon)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
