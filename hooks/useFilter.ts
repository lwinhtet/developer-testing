import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export type FilterState = {
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  minArea: number | '';
  maxArea: number | '';
};

const initialFilterState: FilterState = {
  minPrice: 0,
  maxPrice: 0,
  bedrooms: 0,
  minArea: 0,
  maxArea: 0,
};

const useFilter = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const queryParams = Object.fromEntries(searchParams.entries());
      const initialFilters: FilterState = {
        minPrice: Number(queryParams.minPrice) || 0,
        maxPrice: Number(queryParams.maxPrice) || 0,
        bedrooms: Number(queryParams.bedrooms) || 0,
        minArea: queryParams.minArea ? Number(queryParams.minArea) : '',
        maxArea: queryParams.maxArea ? Number(queryParams.maxArea) : '',
      };
      setFilters(initialFilters);
    }
  }, [searchParams]);

  const setFilter = (name: keyof FilterState, value: number | '') => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const isFiltered = () => {
    // return (
    //   filters.minPrice > 0 ||
    //   filters.maxPrice > 0 ||
    //   (filters.minArea !== '' && filters.minArea > 0) ||
    //   (filters.maxArea !== '' && filters.maxArea > 0) ||
    //   filters.bedrooms !== 0
    // );
    return searchParams && searchParams.size > 0;
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  return {
    filters,
    setFilter,
    resetFilters,
    isFiltered,
  };
};

export default useFilter;
