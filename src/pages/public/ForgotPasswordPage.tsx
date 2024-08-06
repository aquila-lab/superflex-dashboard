import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/hooks';
import { sendResetPasswordEmail } from '@/core/auth/authSlice';
import { AuthWallpaper, Button, buttonVariants, Icons, Input, Label } from '@/components';

const ForgotPasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const onResetPasswordSubmit = async (): Promise<void> => {
    setIsLoading(true);

    const response: any = await dispatch(sendResetPasswordEmail({ email }));
    setIsLoading(false);
    if (response.error) {
      toast.error(response.payload?.message ?? 'Password reset failed');
      return;
    }

    toast.success('Password reset email sent');
    navigate('/login');
  };

  return (
    <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}>
        Login
      </Link>

      <AuthWallpaper />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Reset your Password</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onResetPasswordSubmit();
            }}>
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
