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
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
};

export type CarListResponse = {
  cars: Car[];
  totalCars: number;
};

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const getCars = async () => {
  const { data } = await axios.get<CarListResponse>('/cars');
  return data;
};

export const getSingleCar = async (id: string) => {
  const { data } = await axios.get<Car>(`/cars/${id}`);
  return data;
};
