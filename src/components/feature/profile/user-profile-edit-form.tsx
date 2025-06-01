
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { UserSummary } from '@/lib/types';
import { mockUser } from '@/lib/mock-data'; // To update the mockUser directly
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }).max(30, {
    message: 'Username must not be longer than 30 characters.',
  }),
  name: z.string().max(50, { message: 'Name must not be longer than 50 characters.' }).optional(),
  bio: z.string().max(160, { message: 'Bio must not be longer than 160 characters.' }).optional(),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  avatarUrl: z.string().url({ message: 'Please enter a valid avatar URL.' }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserProfileEditFormProps {
  currentUser: UserSummary;
}

export function UserProfileEditForm({ currentUser }: UserProfileEditFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: currentUser.username || '',
      name: currentUser.name || '',
      bio: currentUser.bio || '',
      website: currentUser.website || '',
      avatarUrl: currentUser.avatarUrl || '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    // Directly update the mockUser object
    mockUser.username = data.username;
    mockUser.name = data.name || '';
    mockUser.bio = data.bio || '';
    mockUser.website = data.website || undefined;
    mockUser.avatarUrl = data.avatarUrl || 'https://placehold.co/150x150.png';


    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated (mock).',
    });
    router.push('/profile');
    router.refresh(); // To ensure the profile page re-fetches/re-renders with updated mock data
  }

  return (
    <Card className="shadow-xl">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Your Information</CardTitle>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Your unique username" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name. It can be your real name or a
                        pseudonym.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Bio (Optional)</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Avatar URL (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com/avatar.png" {...field} />
                    </FormControl>
                    <FormDescription>
                        Link to your profile picture.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </CardFooter>
            </form>
        </Form>
    </Card>
  );
}
