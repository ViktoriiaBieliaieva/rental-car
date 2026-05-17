'use client';

import { useForm } from 'react-hook-form';

const FilterForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { brand: '', price: '', mileageFrom: '', mileageTo: '' },
  });
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('brand')}>
        <option value="">Choose brand</option>
        <option value="BMW">BMW</option>
        <option value="Audi">Audi</option>
      </select>

      <select {...register('price')}>
        <option value="">Choose price</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>

      <input type="number" placeholder="From" {...register('mileageFrom')} />

      <input type="number" placeholder="To" {...register('mileageTo')} />

      <button type="submit">Search</button>

      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
};

export default FilterForm;
