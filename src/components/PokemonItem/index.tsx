import { useEffect, useState } from "react";
import api from "../../services/api";

import styles from "./styles.module.scss";
import { FaCheck } from "react-icons/fa";

interface PokemonItemInterface {
  onAddPokemonToTheTeam: () => void;
  id: number;
  name: string;
}

export function PokemonItem({ id, name, onAddPokemonToTheTeam }: PokemonItemInterface) {
  // estado para armezenar o display do checked do pokemon escolhido
  const [toogle, setToogle] = useState(true);
  const [pokemonChoosed, setPokemonChoosed] = useState("none");

  useEffect(() => {
    setPokemonChoosed((state) => (toogle ? "none" : "block"));
  }, [toogle]);

  return (
    <div
      onClick={onAddPokemonToTheTeam}
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
      <div className={`${styles.pokemonBar} ${styles.pokemonBarColor}`}></div>
      <div style={{ display: pokemonChoosed}} className={styles.checkIcon}>
        <FaCheck size={26} />
      </div>
    </div>
  );
}