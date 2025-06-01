import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UserSummary } from '@/lib/types';
import { Settings, Plus, Link as LinkIcon } from 'lucide-react';

interface UserProfileCardProps {
  user: UserSummary;
  observationsCount: number;
  followersCount: number;
  followingCount: number;
}

export function UserProfileCard({ user, observationsCount, followersCount, followingCount }: UserProfileCardProps) {
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
                {/* Placeholder for "Note..." popover if needed in future */}
             </div>
            <Button variant="outline" size="sm" className="w-full max-w-[100px] sm:w-auto text-xs">
              <Plus className="mr-1 h-3 w-3" /> New
            </Button>
          </div>

          {/* Right Side: User Info, Buttons, Stats, Bio */}
          <div className="flex-1 space-y-4 mt-2 sm:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <h1 className="text-xl md:text-2xl font-light text-foreground">{user.username}</h1>
              <div className="flex gap-2 items-center">
                <Button variant="secondary" size="sm" className="text-xs px-3 py-1 h-auto">Edit Profile</Button>
                <Button variant="secondary" size="sm" className="text-xs px-3 py-1 h-auto">View Archive</Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Settings className="h-5 w-5 text-foreground" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 text-sm">
              <div><span className="font-semibold">{observationsCount}</span> posts</div>
              <div><span className="font-semibold">{followersCount}</span> followers</div>
              <div><span className="font-semibold">{followingCount}</span> following</div>
            </div>

            <div className="text-sm">
              <p className="font-semibold text-foreground">{user.name}</p>
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
