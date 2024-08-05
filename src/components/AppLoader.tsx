import React from 'react';

const AppLoader = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-start h-full w-full">
      <div className="flex space-x-2 justify-center items-center bg-white h-screen">
        <span className="sr-only">Loading...</span>
        <div className="size-6 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="size-6 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="size-6 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default AppLoader;
