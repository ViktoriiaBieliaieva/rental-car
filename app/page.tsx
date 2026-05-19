import { Metadata } from 'next';
import css from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'Find reliable and budget-friendly rental cars for any journey.',
  openGraph: {
    title: 'RentalCar',
    description: 'Find reliable and budget-friendly rental cars for any journey.',
    url: 'https://rental-car-seven-lemon.vercel.app/',
    siteName: 'Rental Car',
    images: [
      {
        url: '/public/HeroBanner.jpg',
        width: 1200,
        height: 630,
        alt: 'RentalCar',
      },
    ],
    type: 'article',
  },
};

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
