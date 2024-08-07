'use client';

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/hooks';
import { getCustomUserError } from '@/api/error';
import { authenticateOAuth, registerUser } from '@/core/auth/authSlice';
import { Button, GoogleOAuthButton, Icons, Input, Label } from '@/components';

interface RegisterUserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterUserAuthForm({
  className,
  ...props
}: RegisterUserAuthFormProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const onRegisterSubmit = async (): Promise<void> => {
    if (formData.password !== formData.repeatPassword) {
      toast.error('Password and confirm password are not equal');
      return;
    }

    setIsLoading(true);
    const response: any = await dispatch(registerUser({ ...formData }));
    setIsLoading(false);
    if (response.error) {
      toast.error(response.payload?.message ?? 'Email is already in use');
      return;
    }

    navigate(`/successful?${searchParams.toString()}`);
  };

  const onGoogleOAuthSubmit = async (code: string): Promise<void> => {
    const response: any = await dispatch(authenticateOAuth({ code }));
    if (response.error) {
      toast.error(getCustomUserError(response.payload, 'Registration failed'));
      return;
    }

    navigate(`/successful?${searchParams.toString()}`);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegisterSubmit();
        }}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={formData.username}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, username: e.target.value }))
              }
            />
          </div>

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
              value={formData.email}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, email: e.target.value }))
              }
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
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

          <div className="grid gap-1">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              value={formData.repeatPassword}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, repeatPassword: e.target.value }))
              }
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create an account
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
