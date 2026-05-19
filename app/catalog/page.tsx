import { getCars } from '@/src/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CatalogClient from './Catalog.client';

const Catalog = async () => {
  const brand = '';
  const price = 0;
  const minMileage = 0;
  const maxMileage = 0;
  const page = 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['catalog', brand, price, minMileage, maxMileage],
    queryFn: () => getCars({ page, brand, price, minMileage, maxMileage }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};

export default Catalog;
