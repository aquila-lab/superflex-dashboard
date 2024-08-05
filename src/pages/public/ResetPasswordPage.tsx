import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppDispatch } from '@/hooks';
import { resetPassword } from '@/core/auth/authSlice';
import { Button } from '@/components';

const ResetPasswordPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function handleResetPassword(): Promise<void> {
    if (newPassword !== confirmNewPassword) {
      toast.warning('New password and confirm new password must be the same');
      return;
    }

    const resetPasswordToken = searchParams.get('code');
    if (!resetPasswordToken) {
      toast.error('Invalid reset password token');
      return;
    }

    const res: any = await dispatch(resetPassword({ code: resetPasswordToken, newPassword }));
    if (res.error) {
      return;
    }

    navigate('/home');
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
          Enter your new password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="new-password"
                  id="new-password"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-new-password"
                className="block text-sm font-medium leading-6 text-gray-900">
                Confirm New Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="confirm-new-password"
                  id="confirm-new-password"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Change password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
