'use client';

import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/src/lib/api';
import CarList from '@/components/CarList/CarList';

const CatalogClient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog'],
    queryFn: () => getCars(),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error || !data?.cars) return <p>Some error..</p>;
  return <>{data && data.cars.length > 0 && <CarList cars={data.cars} />}</>;
};

export default CatalogClient;
