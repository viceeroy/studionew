
import { UserProfileEditForm } from '@/components/feature/profile/user-profile-edit-form';
import { mockUser } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function EditProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to profile</span>
            </Link>
        </Button>
        <h1 className="text-2xl font-headline tracking-tight">Edit Profile</h1>
      </div>
      <UserProfileEditForm currentUser={mockUser} />
    </div>
  );
}
