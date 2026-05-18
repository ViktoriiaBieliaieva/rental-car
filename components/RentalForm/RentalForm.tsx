'use client';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import css from './RentalForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { rentCar } from '@/src/lib/api';
import toast from 'react-hot-toast';

interface RentaFormValues {
  name: string;
  email: string;
  comment: string;
}

const initialValues: RentaFormValues = {
  name: '',
  email: '',
  comment: '',
};

interface RentalFormProps {
  carId: string;
}

const RentaForm = ({ carId }: RentalFormProps) => {
  const { mutate } = useMutation({
    mutationFn: rentCar,
  });

  const handleSubmit = (values: RentaFormValues, actions: FormikHelpers<RentaFormValues>) => {
    mutate(
      {
        carId,
        name: values.name,
        email: values.email,
        comment: values.comment,
      },
      {
        onSuccess: data => {
          actions.resetForm();
          toast.success(data.message);
        },
        onError: error => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>Stay connected! We are always ready to help you.</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.field}
            type="text"
            name="name"
            placeholder="Name*"
            aria-label="Name"
          />
          <Field
            className={css.field}
            type="email"
            name="email"
            placeholder="Email*"
            aria-label="Email"
          />

          <Field
            className={css.textarea}
            as="textarea"
            name="comment"
            placeholder="Comment"
            aria-label="Comment"
            rows={5}
          />

          <button className={css.button} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RentaForm;
