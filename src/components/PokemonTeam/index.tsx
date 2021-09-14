import styles from "./styles.module.scss";
import "animate.css"

interface PokemonTeamInterface {
  index: {};
  id: number;
  pokemonType: string;
}

export function PokemonTeam({ index, id, pokemonType }: PokemonTeamInterface) {
  return (
    <div className={`${styles.pokemonTeamItem}`}>
      <div className={styles.pokemonTeamPokeball}>
        <svg className={`${pokemonType} ${styles.pokemonType}`} width="69" height="69.5" viewBox="0 0 69 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2959 31.6494C8.41262 31.6494 5.52933 31.6494 2.64603 31.6494C-0.206167 31.6494 -0.286135 31.6317 0.273641 28.8594C3.09918 14.8917 11.2515 5.44653 24.9083 1.38593C44.9358 -4.5717 65.7498 9.36053 68.3976 30.0989C68.5398 31.214 68.4109 31.6894 67.1226 31.6761C61.0628 31.6183 54.9985 31.6272 48.9343 31.6716C47.8414 31.6805 47.4771 31.254 47.0994 30.2678C45.0025 24.7766 40.4532 21.5646 34.9754 21.5557C29.3732 21.5468 24.9527 24.7011 22.7536 30.4055C22.3626 31.4184 21.8562 31.6983 20.8299 31.6761C17.6534 31.6094 14.4724 31.6494 11.2959 31.6494Z" fill="white"/>
        </svg>
        <img src="pokeball-background-bottom.svg" alt="" />

        <div className={styles.pokemonInTeamPokeball}>
          {index ? (
            <img
              className={`${styles.pokemonInTeamPokeballImage} animate__animated animate__fadeInDown`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt=""
            />
          ) : (
            <img
              className={`${styles.pokemonInTeamPokeballImage} animate__animated animate__fadeOutDown`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
