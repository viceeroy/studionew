
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UserSummary } from '@/lib/types';
import { Plus, Link as LinkIcon, LogOut, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase'; // Import Firebase auth instance
import { signOut } from 'firebase/auth'; // Import signOut function
import { useRouter } from 'next/navigation'; // Import useRouter

interface UserProfileCardProps {
  user: UserSummary;
  observationsCount: number;
  followersCount: number;
  followingCount: number;
}

export function UserProfileCard({ user, observationsCount, followersCount, followingCount }: UserProfileCardProps) {
  const { toast } = useToast();
  const router = useRouter(); // Initialize router

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/auth'); // Redirect to auth page
    } catch (error) {
      console.error("Logout Error:", error);
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-10">
          {/* Left Side: Avatar and "New" button */}
          <div className="flex flex-col items-center gap-3 w-full sm:w-auto sm:items-start">
             <div className="relative">
                <Avatar className="h-28 w-28 md:h-36 md:w-36 border-2 border-muted shadow-md">
                  <AvatarImage src={user.avatarUrl} alt={user.username} data-ai-hint="profile avatar large" />
                  <AvatarFallback className="text-4xl">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
             </div>
            <Button variant="outline" size="sm" className="w-full max-w-[100px] sm:w-auto text-xs" asChild>
              <Link href="/identify">
                <Plus className="mr-1 h-3 w-3" /> New
              </Link>
            </Button>
          </div>

          {/* Right Side: User Info, Buttons, Stats, Bio */}
          <div className="flex-1 space-y-4 mt-2 sm:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <h1 className="text-xl md:text-2xl font-light text-foreground">{user.username}</h1>
              <div className="flex flex-wrap gap-2 items-center">
                <Button variant="secondary" size="sm" className="text-sm px-4 py-1.5 h-auto" asChild>
                  <Link href="/profile/edit">
                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                  </Link>
                </Button>
                 <Button variant="outline" size="sm" className="text-sm px-4 py-1.5 h-auto" onClick={handleLogoutClick}>
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 text-sm">
              <div><span className="font-semibold">{observationsCount}</span> posts</div>
              <div><span className="font-semibold">{followersCount}</span> followers</div>
              <div><span className="font-semibold">{followingCount}</span> following</div>
            </div>

            <div className="text-sm">
              {user.name && <p className="font-semibold text-foreground">{user.name}</p>}
              {user.bio && <p className="text-muted-foreground whitespace-pre-line">{user.bio}</p>}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 mt-1 font-medium"
                >
                  <LinkIcon className="h-3 w-3" />
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
