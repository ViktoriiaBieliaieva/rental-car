import { Car } from '@/src/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import css from './CarItem.module.css';

type CarItemProps = {
  item: Car;
};

const CarItem = ({ item }: CarItemProps) => {
  return (
    <li className={css.card}>
      <div className={css.thumb}>
        <Image src={item.img} alt={item.brand} width={244} height={268} loading="eager"></Image>
      </div>
      <div className={css.description}>
        <div className={css.topRaw}>
          <p className={css.brand}>
            {item.brand} <span className={css.model}>{item.model}</span>, {item.year}
          </p>
          <p className={css.price}>${item.rentalPrice}</p>
        </div>
        <ul className={css.metaList}>
          <li>{item.location.city}</li>
          <li>{item.location.country}</li>
          <li>{item.rentalCompany}</li>
          <li>{item.type}</li>
          <li>{item.mileage}km</li>
        </ul>
        <Link target="_blank" className={css.link} href={`/catalog/${item.id}`}>
          Read more
        </Link>
      </div>
    </li>
  );
};

export default CarItem;
