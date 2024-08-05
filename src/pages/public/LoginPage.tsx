import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { getCustomUserError } from '@/api/error';
import { authenticateOAuth, loginUser } from '@/core/auth/authSlice';
import { Button, ErrorAlert, GoogleLoginButton } from '@/components';

type FormDataType = {
  email: string;
  password: string;
};

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: ''
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormUpdate = (field: string, value: any): void => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleLoginSubmit = async (): Promise<void> => {
    setLoginFailed(false);
    setErrorMessage('');

    const response: any = await dispatch(loginUser({ ...formData }));
    if (response.error) {
      setLoginFailed(true);
      setErrorMessage(response.payload?.message ?? 'Email is already in use');
      return;
    }

    if (searchParams.get('token')) {
      navigate(`/accept-invite?${searchParams.toString()}`);
      return;
    }

    navigate(`/home`);
  };

  const handleOAuth = async (code: string): Promise<void> => {
    const response: any = await dispatch(authenticateOAuth({ code }));
    if (response.error) {
      setLoginFailed(true);
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
          Sign In to your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div
          className={`bg-white px-6 ${
            loginFailed ? 'pb-12 pt-3' : 'py-12'
          } shadow sm:rounded-lg sm:px-12`}>
          {loginFailed && (
            <div className="my-4">
              <ErrorAlert>{errorMessage}</ErrorAlert>
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginSubmit();
            }}>
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline dark:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
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
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>

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
              <GoogleLoginButton label="Sign In with Google" onAuthentication={handleOAuth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
