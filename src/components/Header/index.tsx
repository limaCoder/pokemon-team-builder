import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.horizontalLine}></div>
        <nav>
          <a href="">Teams</a>
        </nav>
      </div>
    </header>
  )
}