import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import posthog from 'posthog-js';

import {
  Button,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  AuthWallpaper
} from '@/components';
import { useAppSelector } from '@/core/store';

const CollectUserInformationPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const user = useAppSelector((state) => state.user);
  const [expertise, setExpertise] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    posthog.capture('set_expertise_level', { expertise });

    const uniqueID = searchParams.get('uniqueID');
    if (uniqueID) {
      posthog.identify(uniqueID, {
        userID: user.id,
        email: user.email,
        expertiseLevel: expertise
      });
    }

    navigate(`/successful?${searchParams.toString()}`);
  };

  return (
    <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthWallpaper />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">How technical are you?</h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label>Select your technical expertise level</Label>
                <Select value={expertise} onValueChange={setExpertise} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-technical">Non-Technical</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="highly-technical">Highly Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" variant="default">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollectUserInformationPage;
