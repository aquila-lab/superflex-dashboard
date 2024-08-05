import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { getCustomUserError } from '@/api/error';
import { Button, ErrorAlert, GoogleLoginButton } from '@/components';
import { authenticateOAuth, registerUser } from '@/core/auth/authSlice';

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  termsAgreed: boolean;
};

const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [errorMessage, setErrorMessage] = useState('');
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    termsAgreed: false
  });

  const handleFormUpdate = (field: string, value: any): void => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleRegistrationSubmit = async (): Promise<void> => {
    if (formData.password !== formData.repeatPassword) {
      setRegistrationFailed(true);
      setErrorMessage('Password and confirm password are not equal');
      return;
    }

    setRegistrationFailed(false);
    setErrorMessage('');

    const response: any = await dispatch(registerUser({ ...formData }));
    if (response.error) {
      setRegistrationFailed(true);
      setErrorMessage(response.payload?.message ?? 'Email is already in use');
      return;
    }

    if (searchParams.get('token')) {
      navigate(`/accept-invite?${searchParams.toString()}`);
      return;
    }

    navigate('/home');
  };

  const handleOAuth = async (code: string): Promise<void> => {
    const response: any = await dispatch(authenticateOAuth({ code }));
    if (response.error) {
      setRegistrationFailed(true);
      setErrorMessage(getCustomUserError(response.payload, 'Registration failed'));
      return;
    }

    if (searchParams.get('token')) {
      navigate(`/accept-invite?${searchParams.toString()}`);
      return;
    }

    navigate('/home');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Sprout"
        /> */}
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div
          className={`bg-white px-6 ${
            registrationFailed ? 'pb-12 pt-3' : 'py-12'
          } shadow sm:rounded-lg sm:px-12`}>
          {registrationFailed && (
            <div className="my-4">
              <ErrorAlert>{errorMessage}</ErrorAlert>
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistrationSubmit();
            }}>
            <div>
              <label
                htmlFor="fistName"
                className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="fistName"
                  name="fistName"
                  type="text"
                  autoComplete="fistName"
                  value={formData.firstName}
                  onChange={(e) => handleFormUpdate('firstName', e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFormUpdate('lastName', e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleFormUpdate('email', e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={(e) => handleFormUpdate('password', e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="repeatPassword"
                className="block text-sm font-medium leading-6 text-gray-900">
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  autoComplete="off"
                  value={formData.repeatPassword}
                  onChange={(e) => handleFormUpdate('repeatPassword', e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <input
                  id="termsAgreed"
                  name="termsAgreed"
                  type="checkbox"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleFormUpdate('termsAgreed', !formData.termsAgreed)}
                  required
                  className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="termsAgreed" className="ml-3 block text-sm leading-6 text-gray-900">
                  I accept the{' '}
                  <a
                    className="font-medium text-indigo-600 hover:underline dark:text-primary-500"
                    href="/terms-and-conditions"
                    target="_blank">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-sm font-light text-gray-600 dark:text-gray-600">
              Already have an account?{' '}
              <Link
                to={`/login?${searchParams.toString()}`}
                className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
                Login here
              </Link>
            </p>
          </div>

          <div>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <GoogleLoginButton label="Register with Google" onAuthentication={handleOAuth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
