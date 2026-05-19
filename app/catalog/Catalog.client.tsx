'use client';

import { getCars } from '@/src/lib/api';
import CarList from '@/components/CarList/CarList';
import css from './Catalog.module.css';
import FilterForm from '@/components/FilterForm/FilterForm';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';

const CatalogClient = () => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [minMileage, setMinMileage] = useState<number | null>(null);
  const [maxMileage, setMaxMileage] = useState<number | null>(null);
  const { data, fetchNextPage, isLoading, isError, isFetched, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['catalog', brand, price, minMileage, maxMileage],
      queryFn: ({ queryKey, pageParam }) => {
        const [, currentBrand, currentPrice, currentMinMileage, currentMaxMileage] = queryKey as [
          string,
          string,
          number | null,
          number | null,
          number | null,
        ];
        return getCars({
          page: pageParam,
          brand: currentBrand,
          price: currentPrice,
          minMileage: currentMinMileage,
          maxMileage: currentMaxMileage,
        });
      },
      initialPageParam: 1,
      getNextPageParam: lastResponse => {
        const nextPage = lastResponse.page + 1;
        return nextPage <= lastResponse.totalPages ? nextPage : undefined;
      },
      select: data => {
        return {
          ...data,
          cars: data.pages.flatMap(page => page.cars),
        };
      },
    });

  const cars = data?.cars ?? [];
  const hasCars = cars.length > 0;
  const showNoResults = isFetched && !isError && !hasCars;

  const handleSearch = (
    newBrand: string,
    newPrice: number | null,
    newMinMileage: number | null,
    newMaxMileage: number | null
  ) => {
    setBrand(newBrand);
    setPrice(newPrice);
    setMinMileage(newMinMileage);
    setMaxMileage(newMaxMileage);
  };

  const handleClear = () => {
    setBrand('');
    setPrice(null);
    setMinMileage(null);
    setMaxMileage(null);
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <FilterForm onSubmit={handleSearch} onClear={handleClear} />
        {isLoading && <Loader />}
        {isError && <p>Oops, something went wrong! Please try again...</p>}
        {showNoResults && <p>No cars found. Try another search.</p>}
        {hasCars && (
          <>
            <CarList cars={cars} />
            {hasNextPage && (
              <button onClick={() => fetchNextPage()} className={css.button} disabled={isFetching}>
                {isFetching ? 'Loading...' : 'Load more'}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CatalogClient;
