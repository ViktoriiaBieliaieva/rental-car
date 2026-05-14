import Image from 'next/image';
import css from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <Image src="/Logo.svg" alt="Logo" width={104} height={16} />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={css.navigationLink} href="/catalog">
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
