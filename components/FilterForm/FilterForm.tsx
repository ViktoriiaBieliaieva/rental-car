'use client';

import { getFilters } from '@/src/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useId, useState } from 'react';
import Select from 'react-select';
import css from './FilterForm.module.css';

interface FilterFormProps {
  onSubmit: (
    brand: string,
    price: number | null,
    minMileage: number | null,
    maxMileage: number | null
  ) => void;
  onClear: () => void;
}

type Option = {
  value: string;
  label: string;
};

type PriceOption = {
  value: number;
  label: string;
};

// const customStyles = ;

const FilterForm = ({ onSubmit, onClear }: FilterFormProps) => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [minMileage, setMinMileage] = useState<number | null>(null);
  const [maxMileage, setMaxMileage] = useState<number | null>(null);

  const handleSubmit = () => {
    onSubmit(brand, price, minMileage, maxMileage);
  };
  const clearFilters = () => {
    setBrand('');
    setPrice(null);
    setMinMileage(null);
    setMaxMileage(null);
    onClear();
  };

  const id = useId();

  const { data } = useQuery({ queryKey: ['brands'], queryFn: getFilters });
  const brands = data?.brands ?? [];

  const brandOptions: Option[] = brands.map(brand => ({
    value: brand,
    label: brand,
  }));
  const minPrice = data?.price.min ?? 0;
  const maxPrice = data?.price.max ?? 0;
  const prices = Array.from(
    { length: (maxPrice - minPrice) / 10 + 1 },
    (_, i) => minPrice + i * 10
  );
  const priceOptions: PriceOption[] = prices.map(price => ({
    value: price,
    label: String(price),
  }));

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.brandWrapper}>
        <label className={css.label} htmlFor={`${id}-brand`}>
          Car brand
        </label>
        <Select<Option>
          value={brandOptions.find(opt => opt.value === brand) ?? null}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            dropdownIndicator: base => ({
              ...base,
              color: 'var(--main)',
              '&:hover': {
                color: 'var(--main)',
              },
            }),
            control: (base, state) => ({
              ...base,
              backgroundColor: 'var(--white)',
              border: 'none',
              borderColor: state.isFocused ? 'none' : 'none',
              boxShadow: state.isFocused ? 'none' : 'none',
              '&:hover': {
                borderColor: 'none',
              },
              borderRadius: '12px',
              padding: '2px',
              height: '44px',
            }),

            valueContainer: base => ({
              ...base,
              padding: '0 12px',
            }),

            input: base => ({
              ...base,
              margin: 0,
              padding: 0,
              caretColor: 'transparent',
            }),

            placeholder: base => ({
              ...base,
              color: 'var(--main)',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '1.25',
            }),

            menu: base => ({
              ...base,
              borderRadius: '12px',
              marginTop: '4px',
              overflow: 'hidden',
              boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02)',
              padding: '12px 18px',
            }),

            menuList: base => ({
              ...base,
              padding: '0',
              '::-webkit-scrollbar': {
                width: '8px',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'var(--gray-light)',
                borderRadius: '10px',
                height: '128px',
              },
            }),

            option: (base, state) => ({
              ...base,
              backgroundColor: 'var(--white)',
              color: state.isFocused
                ? 'var(--main)'
                : state.isSelected
                  ? 'var(--main)'
                  : 'var(--gray)',
              cursor: 'pointer',
              padding: '4px 0',
            }),
          }}
          inputId={`${id}-brand`}
          placeholder="Choose a brand"
          options={brandOptions}
          onChange={opt => setBrand(opt?.value ?? '')}
        />
      </div>

      <div className={css.priceWrapper}>
        <label className={css.label} htmlFor={`${id}-price`}>
          Price/ 1 hour
        </label>
        <Select<PriceOption>
          value={priceOptions.find(opt => opt.value === price) ?? null}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            dropdownIndicator: base => ({
              ...base,
              color: 'var(--main)',
              '&:hover': {
                color: 'var(--main)',
              },
            }),
            control: (base, state) => ({
              ...base,
              backgroundColor: 'var(--white)',
              border: 'none',
              borderColor: state.isFocused ? 'none' : 'none',
              boxShadow: state.isFocused ? 'none' : 'none',
              '&:hover': {
                borderColor: 'none',
              },
              borderRadius: '12px',
              padding: '2px',
              height: '44px',
            }),

            valueContainer: base => ({
              ...base,
              padding: '0 12px',
            }),

            input: base => ({
              ...base,
              margin: 0,
              padding: 0,
              caretColor: 'transparent',
            }),

            placeholder: base => ({
              ...base,
              color: 'var(--main)',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '1.25',
            }),

            menu: base => ({
              ...base,
              borderRadius: '12px',
              marginTop: '4px',
              overflow: 'hidden',
              boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02)',
              padding: '12px 18px',
            }),

            menuList: base => ({
              ...base,
              padding: '0',
              '::-webkit-scrollbar': {
                width: '8px',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'var(--gray-light)',
                borderRadius: '10px',
                height: '128px',
              },
            }),

            option: (base, state) => ({
              ...base,
              backgroundColor: 'var(--white)',
              color: state.isFocused
                ? 'var(--main)'
                : state.isSelected
                  ? 'var(--main)'
                  : 'var(--gray)',
              cursor: 'pointer',
              padding: '4px 0',
            }),
          }}
          inputId={`${id}-price`}
          placeholder="Choose a price"
          options={priceOptions}
          onChange={opt => setPrice(opt?.value ?? null)}
          formatOptionLabel={(opt, { context }) =>
            context === 'value' ? `To: $${opt.value}` : opt.label
          }
        />
      </div>
      <div className={css.mileageWrapper}>
        <label className={css.label} htmlFor={`${id}-from`}>
          Сar mileage / km
        </label>
        <div className={css.inputsWrapper}>
          <input
            type="number"
            className={css.inputLeft}
            placeholder="From"
            value={minMileage ?? ''}
            id={`${id}-from`}
            onChange={e => setMinMileage(e.target.value === '' ? null : Number(e.target.value))}
          />
          <input
            type="number"
            className={css.inputRight}
            placeholder="To"
            value={maxMileage ?? ''}
            onChange={e => setMaxMileage(e.target.value === '' ? null : Number(e.target.value))}
          />
        </div>
      </div>
      <div className={css.actions}>
        <button className={css.button} type="submit">
          Submit
        </button>
        <button onClick={clearFilters} className={css.clearButton} type="button">
          Clear filters
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
