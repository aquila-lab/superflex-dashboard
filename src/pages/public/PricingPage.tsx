import React, { useState } from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const PricingPage = (): React.ReactNode => {
  const [isAnnual, setIsAnnual] = useState(true);

  const togglePricing = (): void => {
    setIsAnnual(!isAnnual);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Plans and Pricing</h1>
        <p className="text-muted-foreground">
          Everything you need to know about our pricing and plans.
        </p>
      </div>
      <div className="flex mb-8">
        <Button
          variant={isAnnual ? 'outline' : 'default'}
          size="sm"
          className="rounded-r-none"
          onClick={togglePricing}>
          Monthly
        </Button>
        <Button
          variant={isAnnual ? 'default' : 'outline'}
          size="sm"
          className="rounded-l-none"
          onClick={togglePricing}>
          Yearly{' '}
          <span
            className={cn(
              'ml-1 text-xs',
              isAnnual ? 'text-primary-foreground' : 'text-muted-foreground'
            )}>
            (Save 35%)
          </span>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <Card className="flex flex-col w-full md:w-[353px] border-primary shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Individual Pro</CardTitle>
              <Badge variant="secondary">Most popular</Badge>
            </div>
            <CardDescription>Perfect for building and scaling projects.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-3xl font-bold">
              {isAnnual ? '$12' : '$19'}
              <span className="text-sm text-foreground font-normal"> / Month</span>
            </p>
            <p className="text-sm text-muted-foreground">
              *billed {isAnnual ? 'yearly' : 'monthly'}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>500 premium requests per month</li>
              <li>Unlimited basic requests per month</li>
              <li>Priority email support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col w-full md:w-[353px]">
          <CardHeader className="md:pb-[10px]">
            <CardTitle>Team Plan</CardTitle>
            <CardDescription>
              Empower your team with unlimited requests, centralized billing, and advanced
              analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-3xl font-bold">
              {isAnnual ? '$32' : '$49'}
              <span className="text-sm text-foreground font-normal"> / User / Month</span>
            </p>
            <p className="text-sm text-muted-foreground">
              *billed {isAnnual ? 'yearly' : 'monthly'}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Unlimited premium requests per month</li>
              <li>Centralized team billing</li>
              <li>Admin dashboard with usage stats</li>
              <li>Priority support via Slack Connect</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
