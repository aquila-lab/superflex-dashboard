import React, { useEffect } from 'react';
import posthog from 'posthog-js';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button
} from '@/components';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/core/store';
import { useSearchParams } from 'react-router-dom';

const PricingPage = (): React.ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAppSelector((state) => state.user);

  const isAnnual = searchParams.get('billing') !== 'monthly';

  useEffect(() => {
    const source = searchParams.get('source');
    posthog.capture('pricing_page_view', {
      source: source ?? 'unknown',
      userID: user.id,
      email: user.email
    });
  }, [searchParams, user.id, user.email]);

  function togglePricing(): void {
    setSearchParams({ billing: isAnnual ? 'monthly' : 'yearly' });
  }

  function getPaymentLink(
    plan: 'individual_pro_monthly' | 'individual_pro_yearly' | 'team_monthly' | 'team_yearly'
  ): string {
    switch (plan) {
      case 'individual_pro_monthly':
        return `https://buy.stripe.com/eVag2Q3mm1Mm7qEbIZ?client_reference_id=${user.id}&prefilled_email=${user.email}`;
      case 'individual_pro_yearly':
        return `https://buy.stripe.com/dR6aIw4qq3UufXa3cu?client_reference_id=${user.id}&prefilled_email=${user.email}`;
      case 'team_monthly':
        return `https://buy.stripe.com/bIYbMAcWW3UufXafZe?client_reference_id=${user.id}&prefilled_email=${user.email}`;
      case 'team_yearly':
        return `https://buy.stripe.com/fZe3g4aOObmWdP2eVd?client_reference_id=${user.id}&prefilled_email=${user.email}`;
      default: // individual_pro_monthly
        return `https://buy.stripe.com/eVag2Q3mm1Mm7qEbIZ?client_reference_id=${user.id}&prefilled_email=${user.email}`;
    }
  }

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
              <li>Up to 3 projects</li>
              <li>500 premium requests per month</li>
              <li>Unlimited basic requests per month</li>
              <li>Import from Figma</li>
              <li>Priority email support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                (window.location.href = getPaymentLink(
                  isAnnual ? 'individual_pro_yearly' : 'individual_pro_monthly'
                ))
              }>
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
          <CardContent className="flex-grow space-y-3">
            <div>
              <p className="text-4xl font-bold">
                ${isAnnual ? '62' : '99'}
                <span className="text-lg font-normal">/u/mo</span>
              </p>
              <p className="text-sm text-muted-foreground">
                *billed {isAnnual ? 'yearly' : 'monthly'}
              </p>
            </div>

            <div className="space-y-4">
              <p>Everything in Individual Pro plus:</p>

              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Zero data retention policy</li>
                <li>Unlimited projects</li>
                <li>Unlimited premium requests per month</li>
                <li>Personalized onboarding</li>
                <li>Priority support via Slack Connect</li>
                <li>Optional design system consulting</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={() =>
                (window.location.href = getPaymentLink(isAnnual ? 'team_yearly' : 'team_monthly'))
              }>
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
