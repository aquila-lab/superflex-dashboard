import React from 'react';
import * as z from 'zod';
import posthog from 'posthog-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { updateUser } from '@/core/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/core/store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AuthWallpaper
} from '@/components';

const CollectUserInformationPage = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const user = useAppSelector((state) => state.user);

  const showNameFields = searchParams.get('showNameFields') !== 'false';

  const formSchema = z.object({
    ...(showNameFields && {
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required')
    }),
    title: z.string().optional(),
    company: z.string().optional(),
    expertise: z.enum(['non-technical', 'technical', 'highly-technical'], {
      required_error: 'Please select your technical expertise level'
    }),
    referralSource: z.enum(
      [
        'vscode',
        'google',
        'reddit',
        'tiktok',
        'instagram',
        'twitter',
        'youtube',
        'friend',
        'other'
      ],
      {
        required_error: 'Please select how you heard about us'
      }
    )
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(showNameFields && {
        firstName: '',
        lastName: ''
      }),
      title: '',
      company: '',
      expertise: undefined,
      referralSource: undefined
    }
  });

  const onSubmit = async ({
    firstName,
    lastName,
    title,
    company,
    expertise,
    referralSource
  }: FormData): Promise<void> => {
    await dispatch(
      updateUser({
        ...(showNameFields
          ? {
              firstName: firstName as string,
              lastName: lastName as string
            }
          : {}),
        title: title as string,
        company: company as string
      })
    ).unwrap();

    const uniqueID = searchParams.get('uniqueID');
    if (uniqueID) {
      posthog.identify(uniqueID, {
        userID: user.id,
        email: user.email,
        title,
        company,
        expertiseLevel: expertise,
        referralSource
      });

      posthog.capture('referral_source', { referralSource, userID: user.id });
    }

    const origin =
      (location.state as { from: string })?.from ?? `/successful?${searchParams.toString()}`;
    navigate(origin);
  };

  return (
    <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthWallpaper />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Tell us about yourself</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {showNameFields && (
                <>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} value={field.value as string} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} value={field.value as string} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Expertise Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your expertise level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="non-technical">Non-Technical</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="highly-technical">Highly Technical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select how you found us" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vscode">VSCode</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="reddit">Reddit</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="twitter">X/Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CollectUserInformationPage;
