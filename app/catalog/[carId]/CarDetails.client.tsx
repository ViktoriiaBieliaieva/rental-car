'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSingleCar } from '@/src/lib/api';

const CarDetailsClient = () => {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getSingleCar(carId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !car) return <p>Some error..</p>;

  return <p>{car.brand}</p>;
};

export default CarDetailsClient;
