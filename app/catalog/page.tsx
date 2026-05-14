import { getCars } from '@/src/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CatalogClient from './Catalog.client';

const Catalog = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['catalog'],
    queryFn: () => getCars(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};

export default Catalog;
