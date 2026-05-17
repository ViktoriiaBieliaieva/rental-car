'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSingleCar } from '@/src/lib/api';
import css from './CarDetails.module.css';
import Image from 'next/image';
import RentalForm from '@/components/RentalForm/RentalForm';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCalendar2Week } from 'react-icons/bs';
import { BsCarFront } from 'react-icons/bs';
import { RiGasStationLine } from 'react-icons/ri';

const CarDetailsClient = () => {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getSingleCar(carId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !car) return <p>Some error..</p>;

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.leftWrapper}>
          <div className={css.thumb}>
            <Image src={car.img} alt={car.brand} width={640} height={512}></Image>
          </div>
          <RentalForm></RentalForm>
        </div>
        <div className={css.rightWrapper}>
          <h2 className={css.car}>
            {car.brand} {car.model}, {car.year}
            <span className={css.article}>Article: {car.stockNumber}</span>
          </h2>
          <p className={css.location}>
            <IoLocationOutline />
            {car.location.city}, {car.location.country}
          </p>
          <p className={css.price}>${car.rentalPrice}</p>
          <p className={css.description}>{car.description}</p>
          <div className={css.wrapper}>
            <h3 className={css.features}>Rental Conditions:</h3>
            {car.rentalConditions.map((condition, i) => (
              <p className={css.featuresItems} key={i}>
                <AiOutlineCheckCircle />
                {condition}
              </p>
            ))}
          </div>
          <div className={css.wrapper}>
            <h3 className={css.features}>Car Specifications:</h3>
            <p className={css.featuresItems}>
              <BsCalendar2Week />
              Year: {car.year}
            </p>
            <p className={css.featuresItems}>
              <BsCarFront />
              Type: {car.type}
            </p>
            <p className={css.featuresItems}>
              <RiGasStationLine />
              Fuel Consumption: {car.fuelConsumption}
            </p>
            <p className={css.featuresItems}>
              <BsCarFront />
              Engine: {car.engine}
            </p>
            <p className={css.featuresItems}>
              <BsCarFront />
              Mileage: {car.mileage}
            </p>
          </div>
          <div className={css.wrapper}>
            <h3 className={css.features}>Features:</h3>
            {car.features.map((feature, i) => (
              <p className={css.featuresItems} key={i}>
                <AiOutlineCheckCircle />
                {feature}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsClient;
