import { useState } from "react";

import styles from "./styles.module.scss";
import { FaCheck } from "react-icons/fa";

interface PokemonItemInterface {
  onAddPokemonToTheTeam: () => void;
  id: number;
  name: string;
  pokemonTeam: any;
  pokemonType: string;
}

export function PokemonItem({ id, name, pokemonTeam, onAddPokemonToTheTeam, pokemonType }: PokemonItemInterface) {
  // estado para armezenar o display do checked do pokemon escolhido
  const [toogle, setToogle] = useState(false);

  const handleClickPokemon = () => {
    if(pokemonTeam.length <= 6) {
      setToogle(true)
    } else {
      setToogle(false)
    }

    onAddPokemonToTheTeam()
    console.log(pokemonTeam)
  }

  return (
    <div
      onClick={handleClickPokemon}
      key={id}
      className={styles.pokemonItem}
    >
      <div className={styles.pokemonId}>
        <span>{id}</span>
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt=""
      />
      <h3>{name}</h3>
      <div className={`${styles.pokemonBar} ${pokemonType} ${styles.pokemonType}`}></div>
      <div style={{ display: toogle ? 'block' : 'none'}} className={styles.checkIcon}>
        <FaCheck size={26} />
      </div>
    </div>
  );
}