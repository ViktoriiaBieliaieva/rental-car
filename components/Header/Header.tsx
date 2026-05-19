'use client';

import Image from 'next/image';
import css from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <Image src="/Logo.svg" alt="Logo" width={104} height={16} loading="eager" />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link href={href} className={`${css.navigationLink} ${isActive ? css.active : ''}`}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
