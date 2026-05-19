import axios from 'axios';

type Car = {
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

type CarListResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

type getCarsProps = {
  page: number;
  brand: string;
  price: number | null;
  minMileage: number | null;
  maxMileage: number | null;
};

axios.defaults.baseURL = 'https://car-rental-api.goit.study';

export const getCars = async ({
  page,
  brand,
  price,
  minMileage,
  maxMileage,
}: getCarsProps): Promise<CarListResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (brand) {
    params.brand = brand;
  }

  if (price) {
    params.price = price;
  }

  if (minMileage) {
    params.minMileage = minMileage;
  }

  if (maxMileage) {
    params.maxMileage = maxMileage;
  }

  const { data } = await axios.get<CarListResponse>('/cars', {
    params,
  });
  return data;
};

export const getSingleCar = async (id: string): Promise<Car> => {
  const { data } = await axios.get<Car>(`/cars/${id}`);
  return data;
};

type getFiltersResponse = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export const getFilters = async (): Promise<getFiltersResponse> => {
  const { data } = await axios.get<getFiltersResponse>('/cars/filters');
  return data;
};

type rentCarData = {
  carId: string;
  name: string;
  email: string;
  comment?: string;
};

export const rentCar = async ({
  carId,
  name,
  email,
  comment,
}: rentCarData): Promise<{ message: string }> => {
  const { data } = await axios.post<{ message: string }>(`/cars/${carId}/booking-requests`, {
    name,
    email,
    comment,
  });
  return data;
};
