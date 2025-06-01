import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UserSummary } from '@/lib/types';
import { Edit3, Award, Image as ImageIcon } from 'lucide-react';

interface UserProfileCardProps {
  user: UserSummary;
  observationsCount: number;
  identifiedSpeciesCount: number;
}

export function UserProfileCard({ user, observationsCount, identifiedSpeciesCount }: UserProfileCardProps) {
  return (
    <Card className="shadow-xl">
      <CardHeader className="items-center text-center p-6 bg-muted/30">
        <Avatar className="h-24 w-24 mb-4 border-4 border-background shadow-md">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile avatar" />
          <AvatarFallback className="text-3xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
        {/* <p className="text-muted-foreground text-sm">Joined {new Date().toLocaleDateString()} </p> */}
        <Button variant="outline" size="sm" className="mt-3">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-background rounded-lg border">
          <ImageIcon className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-semibold">{observationsCount}</p>
          <p className="text-sm text-muted-foreground">Observations</p>
        </div>
        <div className="p-4 bg-background rounded-lg border">
          <Award className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-semibold">{identifiedSpeciesCount}</p>
          <p className="text-sm text-muted-foreground">Species Identified</p>
        </div>
      </CardContent>
    </Card>
  );
}
