import styles from "./styles.module.scss";
import { FaTrash, FaCheck } from "react-icons/fa";

interface TeamOptionsInterface {
  onDeletePokemon?: () => void;
  onSendPokemonData?: (e: any) => void;
  opacity: number;
}

export function TeamOptions({ onDeletePokemon, opacity, onSendPokemonData }: TeamOptionsInterface) {
  return (
    <div className={styles.teamOptions}>
      <div style={{ opacity: opacity }} onClick={onDeletePokemon} className={styles.trashIcon}>
        <FaTrash size={26} />
      </div>
      <div onClick={onSendPokemonData} style={{ opacity: opacity }} className={styles.checkIcon}>
        <FaCheck size={26} />
      </div>
    </div>
  );
}
