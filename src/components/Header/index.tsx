import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/dist/client/router';
import styles from './styles.module.scss';

export function Header() {
  const { asPath } = useRouter(); // pegando o caminho atual da página

  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.horizontalLine}></div>
        <nav>
          { asPath === '/' ? ( // se o caminho da página for igual a /, renderiza o link de equipes
            <Link href="/teams">
              <a>Teams</a>
            </Link>
          ) : ( // senão renderiza de criar equipes
          <Link href="/">
            <a>Create new team</a>
          </Link>
          )}
        </nav>
      </div>
    </header>
  )
}