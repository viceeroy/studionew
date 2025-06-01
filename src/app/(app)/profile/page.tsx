import { UserProfileCard } from '@/components/feature/profile/user-profile-card';
import { UserObservationGallery } from '@/components/feature/profile/user-observation-gallery';
import { mockUser, mockObservations } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Grid, Bookmark, Tag as TagIcon } from 'lucide-react'; // Renamed Tag to TagIcon to avoid conflict

export default function ProfilePage() {
  const user = mockUser;
  // Filter observations by current mock user, or use all for broader display in mock
  const userObservations = mockObservations.filter(obs => obs.user.username === user.username); 
  const observationsCount = userObservations.length;
  
  // Mock data for followers and following, as in the reference image
  const followersCount = 1003;
  const followingCount = 397;

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2 sm:px-4">
      <UserProfileCard
        user={user}
        observationsCount={observationsCount}
        followersCount={followersCount}
        followingCount={followingCount}
      />
      
      <Separator className="my-4 md:my-6" />

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-sm mx-auto bg-transparent p-0 border-b rounded-none">
          <TabsTrigger value="posts" className="pb-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
            <Grid className="mr-2 h-4 w-4 text-muted-foreground data-[state=active]:text-foreground" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:text-foreground">Posts</span>
            </TabsTrigger>
          <TabsTrigger value="saved" className="pb-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
            <Bookmark className="mr-2 h-4 w-4 text-muted-foreground data-[state=active]:text-foreground" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:text-foreground">Saved</span>
            </TabsTrigger>
          <TabsTrigger value="tagged" className="pb-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
            <TagIcon className="mr-2 h-4 w-4 text-muted-foreground data-[state=active]:text-foreground" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:text-foreground">Tagged</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <UserObservationGallery observations={userObservations} />
        </TabsContent>
        <TabsContent value="saved">
          <div className="text-center py-10 text-muted-foreground">
            <Bookmark className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">Save</h3>
            <p className="mt-1 text-sm">Save photos and videos that you want to see again.</p>
          </div>
        </TabsContent>
        <TabsContent value="tagged">
           <div className="text-center py-10 text-muted-foreground">
            <TagIcon className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">Photos of you</h3>
            <p className="mt-1 text-sm">When people tag you in photos, they'll appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
