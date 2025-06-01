import { UserProfileCard } from '@/components/feature/profile/user-profile-card';
import { UserObservationGallery } from '@/components/feature/profile/user-observation-gallery';
import { mockUser, mockObservations } from '@/lib/mock-data'; // Using mock data

export default function ProfilePage() {
  const user = mockUser;
  // Filter observations by current mock user
  const userObservations = mockObservations.filter(obs => obs.user.id === user.id);
  const identifiedSpeciesCount = new Set(
    userObservations.map(obs => obs.species?.latinName).filter(Boolean)
  ).size;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <UserProfileCard
        user={user}
        observationsCount={userObservations.length}
        identifiedSpeciesCount={identifiedSpeciesCount}
      />
      <UserObservationGallery observations={userObservations} />
    </div>
  );
}
