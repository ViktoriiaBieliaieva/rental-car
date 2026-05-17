'use client';

import { getCars } from '@/src/lib/api';
import CarList from '@/components/CarList/CarList';
import css from './Catalog.module.css';
import FilterForm from '@/components/FilterForm/FilterForm';
import { useInfiniteQuery } from '@tanstack/react-query';

const CatalogClient = () => {
  const { data, fetchNextPage, isLoading, isError, isFetched, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['catalog'],
      queryFn: ({ pageParam }) => {
        // const [] = queryKey;
        return getCars({ page: pageParam });
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

  return (
    <section className={css.section}>
      <div className={css.container}>
        <FilterForm />
        {isLoading && <p>Loading data, please wait...</p>}
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
