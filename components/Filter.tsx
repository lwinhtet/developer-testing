import React, { ChangeEvent, FocusEvent, useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  SelectChangeEvent,
  ButtonGroup,
} from '@mui/material';
import { FilterState } from '../hooks/useFilter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GET_PROPERTIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { PAGE_SIZE } from '../utils/helper';
import { ListingType } from '@prisma/client';
import Link from 'next/link';

const minPriceOptions = [
  { value: 0, label: 'Any Price' },
  { value: 100000, label: '100,000 B' },
  { value: 200000, label: '200,000 B' },
  { value: 300000, label: '300,000 B' },
  { value: 400000, label: '400,000 B' },
  { value: 500000, label: '500,000 B' },
  { value: 600000, label: '600,000 B' },
];

const maxPriceOptions = [
  { value: 0, label: 'Any Price' },
  { value: 1000000, label: '1,000,000 B' },
  { value: 2000000, label: '2,000,000 B' },
  { value: 3000000, label: '3,000,000 B' },
  { value: 4000000, label: '4,000,000 B' },
  { value: 5000000, label: '5,000,000 B' },
  { value: 6000000, label: '6,000,000 B' },
];

const bedroomOptions = [
  { value: 0, label: 'Any' },
  { value: 1, label: '1 Bedroom' },
  { value: 2, label: '2 Bedrooms' },
  { value: 3, label: '3 Bedrooms' },
  { value: 4, label: '4 Bedrooms' },
  { value: 5, label: '5 Bedrooms' },
];

type FilterProps = {
  filters: FilterState;
  setFilter: (name: keyof FilterState, value: number | '') => void;
  resetFilters: () => void;
  listingType: ListingType;
};

const Filter: React.FC<FilterProps> = ({
  filters,
  setFilter,
  resetFilters,
  listingType,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentListingType] = useState<ListingType>(listingType);

  const { refetch } = useQuery(GET_PROPERTIES, { skip: true });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const construstVariables = (name: string, value: string | number) => {
    const current = {
      ...filters,
      [name]: value,
    };
    return Object.fromEntries(
      Object.entries(current).filter(([key, value]) => value !== '')
    );
  };

  const handlePriceRange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFilter(name as keyof FilterState, parseInt(value as string));
    router.push(pathname + '?' + createQueryString(name, value as string));
    const variables = construstVariables(name, value);
    refetch({
      listingType,
      offset: 0,
      limit: PAGE_SIZE,
      ...variables,
    });
  };

  const handleAreaRange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = value === '' ? '' : parseInt(value, 10);

    if (parsedValue === '' || !isNaN(parsedValue)) {
      router.push(pathname + '?' + createQueryString(name, value as string));
      setFilter(name as keyof FilterState, parsedValue);
    }
  };

  const handleAreaRangeOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    router.push(pathname + '?' + createQueryString(name, value as string));
    const variables = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== '')
    );

    refetch({
      listingType,
      offset: 0,
      limit: PAGE_SIZE,
      ...variables,
    });
  };

  const handleBedroomChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;

    setFilter(name as keyof FilterState, parseInt(value as string));
    router.push(pathname + '?' + createQueryString(name, value as string));
    const variables = construstVariables(name, value);

    refetch({
      listingType,
      offset: 0,
      limit: PAGE_SIZE,
      ...variables,
    });
  };

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mt={2}
        >
          <ButtonGroup variant="contained" aria-label="listing type">
            <Link href="/property-for-sale" passHref>
              <Button
                color={
                  currentListingType === ListingType.SALE
                    ? 'primary'
                    : 'inherit'
                }
                sx={{
                  height: '100%',
                  fontWeight: 'bold',
                  textDecoration:
                    currentListingType === ListingType.SALE
                      ? 'underline'
                      : 'none',
                  color:
                    currentListingType === ListingType.SALE
                      ? 'primary'
                      : '#333',
                }}
              >
                Sale
              </Button>
            </Link>
            <Link href="/property-for-rent" passHref>
              <Button
                color={
                  currentListingType === ListingType.RENT
                    ? 'primary'
                    : 'inherit'
                }
                sx={{
                  height: '100%',
                  fontWeight: 'bold',
                  textDecoration:
                    currentListingType === ListingType.RENT
                      ? 'underline'
                      : 'none',
                  color:
                    currentListingType === ListingType.RENT
                      ? 'primary'
                      : '#333',
                }}
              >
                Rent
              </Button>
            </Link>
          </ButtonGroup>
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="min-price-label">Min Price</InputLabel>
            <Select
              name="minPrice"
              labelId="min-price-label"
              value={filters.minPrice}
              onChange={handlePriceRange}
              label="Min Price"
            >
              {minPriceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="max-price-label">Max Price</InputLabel>
            <Select
              name="maxPrice"
              labelId="max-price-label"
              value={filters.maxPrice}
              onChange={handlePriceRange}
              label="Max Price"
            >
              {maxPriceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
            <Select
              name="bedrooms"
              labelId="bedrooms-label"
              value={filters.bedrooms}
              onChange={handleBedroomChange}
              label="Bedrooms"
            >
              {bedroomOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Min Area (sq ft)"
            name="minArea"
            type="number"
            value={filters.minArea}
            onBlur={handleAreaRangeOnBlur}
            onChange={handleAreaRange}
            variant="outlined"
            sx={{ minWidth: 150 }}
          />
          <TextField
            name="maxArea"
            label="Max Area (sq ft)"
            type="number"
            value={filters.maxArea}
            onChange={handleAreaRange}
            onBlur={handleAreaRangeOnBlur}
            variant="outlined"
            sx={{ minWidth: 150 }}
          />
          <Button variant="contained" color="primary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Filter;
