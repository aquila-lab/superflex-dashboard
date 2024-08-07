'use client';

import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/hooks';
import { getCustomUserError } from '@/api/error';
import { authenticateOAuth, loginUser } from '@/core/auth/authSlice';
import { Button, GoogleOAuthButton, Icons, Input, Label } from '@/components';

interface LoginUserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginUserAuthForm({ className, ...props }: LoginUserAuthFormProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });

  const onLoginSubmit = async (): Promise<void> => {
    setIsLoading(true);

    const response: any = await dispatch(loginUser({ ...formData }));
    setIsLoading(false);
    if (response.error) {
      toast.error(response.payload?.message ?? 'Login failed');
      return;
    }

    navigate(`/successful?${searchParams.toString()}`);
  };

  const onGoogleOAuthSubmit = async (code: string): Promise<void> => {
    const response: any = await dispatch(authenticateOAuth({ code }));
    if (response.error) {
      toast.error(getCustomUserError(response.payload, 'Login failed'));
      return;
    }

    navigate(`/successful?${searchParams.toString()}`);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLoginSubmit();
        }}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={formData.usernameOrEmail}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, usernameOrEmail: e.target.value }))
              }
            />
          </div>

          <div className="grid gap-1">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, password: e.target.value }))
              }
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <GoogleOAuthButton onAuthentication={onGoogleOAuthSubmit} />
    </div>
  );
}
