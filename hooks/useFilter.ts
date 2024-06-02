import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export type FilterState = {
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  minArea: number | '';
  maxArea: number | '';
  [key: string]: any;
};

const initialFilterState: FilterState = {
  minPrice: 0,
  maxPrice: 0,
  bedrooms: 0,
  minArea: '',
  maxArea: '',
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
    return searchParams && searchParams.size > 0;
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  const filterVariables = () => {
    return Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== '')
    );
  };

  return {
    filters,
    setFilter,
    resetFilters,
    isFiltered,
    initialFilterState,
    filterVariables,
  };
};

export default useFilter;
