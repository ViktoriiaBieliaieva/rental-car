import { Car } from '@/src/lib/api';
import Link from 'next/link';

type CarItemProps = {
  item: Car;
};

const CarItem = ({ item }: CarItemProps) => {
  return (
    <li>
      <Link href={`/catalog/${item.id}`}>{item.brand}</Link>
    </li>
  );
};

export default CarItem;
