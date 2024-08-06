import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppDispatch } from '@/hooks';
import { resetPassword } from '@/core/auth/authSlice';
import { AuthWallpaper, Button, Icons, Input, Label } from '@/components';

const ResetPasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onResetPasswordSubmit = async (): Promise<void> => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const resetPasswordToken = searchParams.get('code');
    if (!resetPasswordToken) {
      toast.error('Invalid reset password token');
      return;
    }

    const response: any = await dispatch(
      resetPassword({ code: resetPasswordToken, newPassword: password })
    );
    setIsLoading(false);
    if (response.error) {
      toast.error(response.payload?.message ?? 'Password reset failed');
      return;
    }

    toast.success('Password reset successfully');
    navigate('/login');
  };

  return (
    <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthWallpaper />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Enter new Password</h1>
            <p className="text-sm text-muted-foreground">Enter your new password below</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onResetPasswordSubmit();
            }}>
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  placeholder="new-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Reset password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
