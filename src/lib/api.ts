import axios from 'axios';

export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
};

export type CarListResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

interface getCarsProps {
  page: number;
}

axios.defaults.baseURL = 'https://car-rental-api.goit.study';

export const getCars = async ({ page }: getCarsProps) => {
  const { data } = await axios.get<CarListResponse>('/cars', {
    params: { page, perPage: 12 },
  });
  return data;
};

export const getSingleCar = async (id: string) => {
  const { data } = await axios.get<Car>(`/cars/${id}`);
  return data;
};

type getFiltersResponse = {
  brands: string[];
  price: {
    min: null;
    max: number;
  };
};

export const getFilters = async () => {
  const { data } = await axios.get<getFiltersResponse>('/cars/filters');
  return data;
};
