import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { AuthWallpaper, buttonVariants, LoginUserAuthForm } from '@/components';

const LoginPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to={`/register?${searchParams.toString()}`}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}>
          Create an account
        </Link>

        <AuthWallpaper />

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            <LoginUserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
