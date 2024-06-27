import React, { useState } from 'react';
import styles from './App.module.css';
import { InputAdornment } from '@mui/material';
import { Formik, FormikErrors, FormikHandlers, FormikTouched, FormikValues } from 'formik';
import { validationSchema } from './utils/validationSchema';
import ErrorText from './components/ErrorText/ErrorText';
import { ReactComponent as ErrorIcon } from './assets/error.svg';
import { StyledButton, StyledTextField } from './utils/styledMUI';
import CustomSelect from './components/CustomSelect/CustomSelect';

type TStep = 'Initial info' | 'Password screen' | 'Review';

export type TCountry = {
  id: number;
  name: string;
};

type TData = {
  username: string;
  email: string;
  country: TCountry;
  password: string;
  repeatPassword: string;
};

const INITIAL_VALUES: TData = {
  username: '',
  email: '',
  country: {} as TCountry,
  password: '',
  repeatPassword: '',
};

const MOCK_COUNTRIES: TCountry[] = [
  { id: 1, name: 'Country 1' },
  { id: 2, name: 'Country 2' },
  { id: 3, name: 'Country 3' },
  { id: 4, name: 'Country 4' },
  { id: 5, name: 'Country 5' },
];

function App() {
  const [step, setStep] = useState<TStep>('Initial info');

  const mockOnSubmit = (data: TData) => {
    setTimeout(() => alert(JSON.stringify(data, null, 2)), 500);
  };

  const InitialForm = (props: {
    handleChange: FormikHandlers['handleChange'];
    dirty: boolean;
    errors: FormikErrors<TData>;
    touched: FormikTouched<TData>;
    handleBlur: FormikHandlers['handleBlur'];
    isValid: boolean;
    values: FormikValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  }) => {
    const isUsernameError = props.touched.username && Boolean(props.errors.username);
    const isEmailError = props.touched.email && Boolean(props.errors.email);

    return (
      <div className={styles.form}>
        <div>
          <p className={styles.form__label} id="username">
            Username
          </p>
          <StyledTextField
            placeholder={'Input username'}
            id="username"
            variant={'outlined'}
            size="small"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={isUsernameError}
            InputProps={{
              endAdornment: isUsernameError && (
                <InputAdornment position="end">
                  <ErrorIcon />
                </InputAdornment>
              ),
            }}
          />
          {props.touched.username && <ErrorText label={props.errors.username ?? ''} />}
        </div>
        <div>
          <p className={styles.form__label} id="email">
            Email
          </p>
          <StyledTextField
            placeholder={'Input email'}
            id="email"
            variant={'outlined'}
            size="small"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={isEmailError}
            InputProps={{
              endAdornment: isEmailError && (
                <InputAdornment position="end">
                  <ErrorIcon />
                </InputAdornment>
              ),
            }}
          />
          {props.touched.email && <ErrorText label={props.errors.email ?? ''} />}
        </div>
        <div>
          <p className={styles.form__label} id="country">
            Country
          </p>
          <CustomSelect
            country={props.values.country}
            setFieldValue={props.setFieldValue}
            optionList={MOCK_COUNTRIES}
          />
          {props.touched.username && props.touched.email && (
            <ErrorText label={props.errors.country?.name ?? ''} />
          )}
        </div>

        <StyledButton
          disabled={
            Boolean(props.errors.username) ||
            Boolean(props.errors.email) ||
            Boolean(props.errors.country) ||
            !props.dirty
          }
          onClick={() => setStep('Password screen')}
        >
          Continue
        </StyledButton>
      </div>
    );
  };

  const PasswordForm = (props: {
    handleChange: FormikHandlers['handleChange'];
    dirty: boolean;
    errors: FormikErrors<TData>;
    touched: FormikTouched<TData>;
    handleBlur: FormikHandlers['handleBlur'];
    isValid: boolean;
  }) => {
    const isPasswordError = props.touched.password && Boolean(props.errors.password);
    const isRepeatPasswordError =
      props.touched.repeatPassword && Boolean(props.errors.repeatPassword);
    return (
      <div className={styles.form}>
        <div>
          <p className={styles.form__label}>Password</p>
          <StyledTextField
            type={'password'}
            placeholder={'Input password'}
            id="password"
            variant={'outlined'}
            size="small"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={isPasswordError}
            InputProps={{
              endAdornment: isPasswordError && (
                <InputAdornment position="end">
                  <ErrorIcon />
                </InputAdornment>
              ),
            }}
          />
          {props.touched.password && <ErrorText label={props.errors.password ?? ''} />}
        </div>
        <div>
          <p className={styles.form__label}>Repeat password</p>
          <StyledTextField
            type={'password'}
            placeholder={'Repeat password'}
            id="repeatPassword"
            variant={'outlined'}
            size="small"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={isRepeatPasswordError}
            InputProps={{
              endAdornment: isRepeatPasswordError && (
                <InputAdornment position="end">
                  <ErrorIcon />
                </InputAdornment>
              ),
            }}
          />
          {props.touched.repeatPassword && <ErrorText label={props.errors.repeatPassword ?? ''} />}
        </div>

        <StyledButton
          disabled={
            Boolean(props.errors.password) || Boolean(props.errors.repeatPassword) || !props.dirty
            //something new 4 car
          }
          onClick={() => setStep('Review')}
        >
          Continue
        </StyledButton>
      </div>
    );
  };

  const ReviewForm = (props: {
    values: FormikValues;
    handleSubmit: FormikHandlers['handleSubmit'];
  }) => {
    return (
      <div className={styles.review}>
        <div className={styles.review__row}>
          <p className={styles.review__rowLabel}>Username</p>
          <p className={styles.review__rowValue}>{props.values.username ?? ''}</p>
        </div>
        <div className={styles.review__row}>
          <p className={styles.review__rowLabel}>Email</p>
          <p className={styles.review__rowValue}>{props.values.email ?? ''}</p>
        </div>
        <div className={styles.review__row}>
          <p className={styles.review__rowLabel}>Country</p>
          <p className={styles.review__rowValue}>{props.values.country?.name ?? ''}</p>
        </div>
        <StyledButton
          onClick={() => {
            props.handleSubmit();
            setStep('Initial info');
          }}
        >
          Complete
        </StyledButton>
      </div>
    );
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.label}>Super test form</h1>
      <h2 className={styles.description}>{step}</h2>
      <div className={styles.dialog}>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={(values, { resetForm }) => {
            mockOnSubmit(values);
            resetForm({ values: { ...INITIAL_VALUES } });
          }}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({
            values,
            isValid,
            errors,
            dirty,
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            setFieldValue,
          }) => (
            <form>
              {step === 'Initial info' && (
                <InitialForm
                  handleChange={handleChange}
                  dirty={dirty}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  isValid={isValid}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 'Password screen' && (
                <PasswordForm
                  handleChange={handleChange}
                  dirty={dirty}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  isValid={isValid}
                />
              )}
              {step === 'Review' && <ReviewForm values={values} handleSubmit={handleSubmit} />}
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default App;
