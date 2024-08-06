import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { AuthWallpaper, buttonVariants, RegisterUserAuthForm } from '@/components';

const RegisterPage = (): JSX.Element => {
  return (
    <>
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
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>

            <RegisterUserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
