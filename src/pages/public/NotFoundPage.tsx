import React from 'react';
import { NotFoundComponent } from '@/components';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-start h-full w-full">
      <NotFoundComponent
        title="Page not found"
        description="Sorry, we couldn’t find the page you’re looking for."
      />
    </div>
  );
};

export default NotFoundPage;
