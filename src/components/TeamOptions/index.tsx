import styles from "./styles.module.scss";
import { FaTrash, FaCheck } from "react-icons/fa";

interface TeamOptionsInterface {
  onDeletePokemon: () => void;
  opacity: number;
}

export function TeamOptions({ onDeletePokemon, opacity }: TeamOptionsInterface) {
  return (
    <div className={styles.teamOptions}>
      <div style={{ opacity: opacity }} onClick={onDeletePokemon} className={styles.trashIcon}>
        <FaTrash size={26} />
      </div>
      <div style={{ opacity: opacity }} className={styles.checkIcon}>
        <FaCheck size={26} />
      </div>
    </div>
  );
}
