import styles from "./styles.module.scss";
import { FaTrash, FaCheck } from "react-icons/fa";

export function TeamOptions() {
  return (
    <div className={styles.teamOptions}>
      <div className={styles.trashIcon}>
        <FaTrash size={26} />
      </div>
      <div className={styles.checkIcon}>
        <FaCheck size={26} />
      </div>
    </div>
  );
}
