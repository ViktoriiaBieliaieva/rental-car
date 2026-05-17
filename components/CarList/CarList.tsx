import { Car } from '@/src/lib/api';
import CarItem from '../CarItem/CarItem';
import css from './CarList.module.css';

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  return (
    <ul className={css.list}>
      {cars.map(car => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
};

export default CarList;
