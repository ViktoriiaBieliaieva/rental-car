import { Car } from '@/src/lib/api';
import CarItem from '../CarItem/CarItem';

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  return (
    <ul>
      {cars.map(car => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
};

export default CarList;
