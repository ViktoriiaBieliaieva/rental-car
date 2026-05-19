'use client';

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import css from './RentalForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { rentCar } from '@/src/lib/api';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface RentalFormValues {
  name: string;
  email: string;
  comment: string;
}

const initialValues: RentalFormValues = {
  name: '',
  email: '',
  comment: '',
};

interface RentalFormProps {
  carId: string;
}

const RentalFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  comment: Yup.string().max(500, 'Comment is too long'),
});

const RentalForm = ({ carId }: RentalFormProps) => {
  const { mutate } = useMutation({
    mutationFn: rentCar,
  });

  const handleSubmit = (values: RentalFormValues, actions: FormikHelpers<RentalFormValues>) => {
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RentalFormSchema}
      >
        <Form className={css.form}>
          <ErrorMessage name="name" component="span" className={css.error} />
          <Field
            className={css.field}
            type="text"
            name="name"
            placeholder="Name*"
            aria-label="Name"
          />
          <ErrorMessage name="email" component="span" className={css.error} />
          <Field
            className={css.field}
            type="email"
            name="email"
            placeholder="Email*"
            aria-label="Email"
          />
          <ErrorMessage name="comment" component="span" className={css.error} />
          <Field
            className={css.textarea}
            as="textarea"
            name="comment"
            placeholder="Comment*"
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

export default RentalForm;
