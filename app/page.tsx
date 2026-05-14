import css from './page.module.css';
import Link from 'next/link';

const Home = () => {
  return (
    <section className={css.section}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
      <Link className={css.link} href={'/catalog'}>
        View Catalog
      </Link>
    </section>
  );
};

export default Home;
