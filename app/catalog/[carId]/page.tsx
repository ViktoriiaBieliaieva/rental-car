import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getSingleCar } from '@/src/lib/api';
import CarDetailsClient from './CarDetails.client';

type CarDetailsProps = {
  params: Promise<{ carId: string }>;
};

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { carId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => getSingleCar(carId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
};

export default CarDetails;
