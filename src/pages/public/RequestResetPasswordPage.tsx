import React, { useState } from 'react';

import { Button } from '@/components';
import { useAppDispatch } from '@/hooks';
import { sendResetPasswordEmail } from '@/core/auth/authSlice';

const RequestResetPasswordPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  async function handleSendResetPasswordEmail(): Promise<void> {
    const res: any = await dispatch(sendResetPasswordEmail({ email }));
    if (res.error) {
      return;
    }

    setEmailSent(true);
    setEmail('');
  }

  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-full w-full">
        <h2 className="text-lg text-gray-900 font-medium">Check your email</h2>
        <p className="text-sm italic text-gray-600">
          {`We've sent a password reset link to your email address. Please check your inbox and
          follow the instructions in the email.`}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Sprout"
        /> */}
        <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
          Enter your email to reset password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendResetPasswordEmail();
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Reset password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPasswordPage;
