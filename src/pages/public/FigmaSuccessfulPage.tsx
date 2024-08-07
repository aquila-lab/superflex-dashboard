import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const FigmaSuccessfulPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  useEffect(() => {
    const redirectToVsCode = searchParams.get('state');
    if (!redirectToVsCode) {
      toast.error('Something went wrong. Please try again later.');
      return;
    }

    window.location.href = `${decodeURIComponent(redirectToVsCode)}`;
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center h-full gap-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">
        Figma Account Connected Successfully!
      </h1>
      <p className="text-sm text-muted-foreground text-center sm:max-w-lg mb-1">
        You have successfully logged in to your Figma account. You can now close this tab and return
        to VSCode to continue with the next steps.
      </p>
    </div>
  );
};

export default FigmaSuccessfulPage;
