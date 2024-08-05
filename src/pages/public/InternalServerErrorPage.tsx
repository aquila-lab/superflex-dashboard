import React from 'react';

const InternalServerErrorPage = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-start h-full w-full">
      <div className="text-center grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <p className="text-base font-semibold text-indigo-600">500</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Internal Server Error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Oops, something went wrong. Please try again.
        </p>
        <div className="mt-6">
          <a
            href="/home"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto">
            Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;
