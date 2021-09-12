import styles from "./styles.module.scss";

interface PokemonTeamInterface {
  index: {};
  id: number | false;
}

export function PokemonTeam({ index, id}: PokemonTeamInterface) {
  return (
    <div className={styles.pokemonTeamItem}>
      <div className={styles.pokemonTeamPokeball}>
        <img src="pokeball-background-top.svg" alt="" />
        <img src="pokeball-background-bottom.svg" alt="" />

        <div className={styles.pokemonInTeamPokeball}>
          {index && (
            <img
              className={styles.pokemonInTeamPokeballImage}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
