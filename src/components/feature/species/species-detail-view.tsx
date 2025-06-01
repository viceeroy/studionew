import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { DisplayableSpeciesDetails, SimilarSpeciesSuggestion } from '@/lib/types';
import { ShareButtons } from '@/components/shared/share-buttons';
import { MapPin, Drumstick, Users, ShieldAlert, Leaf, Brain, Trees, Lightbulb, Globe } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SpeciesDetailViewProps {
  species: DisplayableSpeciesDetails;
  similarSpeciesSuggestions?: SimilarSpeciesSuggestion[]; // From suggestSimilarSpecies flow
  originalPhotoUrl?: string; // Optional: photo from initial identification
}

export function SpeciesDetailView({ species, similarSpeciesSuggestions, originalPhotoUrl }: SpeciesDetailViewProps) {
  const { identification, habitat, diet, similarSpecies, endangeredStatus, ecologicalNiche, interestingFact, geographicDistribution } = species;

  const detailItems = [
    { icon: MapPin, label: 'Habitat', value: habitat },
    { icon: Drumstick, label: 'Diet', value: diet },
    { icon: Leaf, label: 'Ecological Niche', value: ecologicalNiche },
    { icon: Globe, label: 'Geographic Distribution', value: geographicDistribution },
    { icon: Lightbulb, label: 'Interesting Fact', value: interestingFact },
    ...(endangeredStatus && endangeredStatus.toLowerCase() !== 'least concern' && endangeredStatus.toLowerCase() !== 'n/a' && endangeredStatus.toLowerCase() !== 'not applicable' && endangeredStatus.toLowerCase() !== 'unknown'
      ? [{ icon: ShieldAlert, label: 'Endangered Status', value: endangeredStatus, isBadge: true, variant: 'destructive' as const }]
      : [{ icon: ShieldAlert, label: 'Endangered Status', value: endangeredStatus || 'Unknown', isBadge: true, variant: 'secondary' as const }]),
  ];
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Learn about the ${identification.commonName} on Semurg:`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0 relative">
          {/* Use placeholder if no original photo. In real app, fetch a representative image. */}
          <div className="relative w-full h-64 md:h-80 bg-muted">
             <Image
                src={originalPhotoUrl || `https://placehold.co/800x400.png`}
                alt={identification.commonName}
                layout="fill"
                objectFit="cover"
                data-ai-hint={`${identification.commonName} animal plant`}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <CardTitle className="font-headline text-4xl md:text-5xl text-white shadow-md">{identification.commonName}</CardTitle>
            <CardDescription className="italic text-lg text-gray-200 shadow-sm">{identification.latinName}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h3 className="font-headline text-xl mb-3 border-b pb-2">Details</h3>
              <div className="space-y-4">
                {detailItems.map((item, index) => (
                  item.value && (
                  <div key={index} className="flex items-start gap-3">
                    <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{item.label}</h4>
                       {item.isBadge ? (
                        <Badge variant={item.variant || 'default'} className="mt-1">{item.value}</Badge>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                  )
                ))}
              </div>
            </section>

            {similarSpecies && similarSpecies.length > 0 && (
              <section>
                <h3 className="font-headline text-xl mb-3 border-b pb-2">Related Species (General)</h3>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Taxonomically Similar</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {similarSpecies.map((sp, i) => (
                        <Badge key={i} variant="outline">{sp}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="md:col-span-1 space-y-6 md:border-l md:pl-6">
             <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><Brain className="h-5 w-5 text-accent"/>AI Generated Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        The {identification.commonName} ({identification.latinName}), belonging to the genus {identification.genus},
                        is typically found in {habitat || 'various habitats'} and its range includes {geographicDistribution || 'various regions'}. Its diet consists mainly of {diet || 'various food sources'}.
                        This species plays a role as {ecologicalNiche || 'part of its ecosystem'}.
                        An interesting fact: {interestingFact || 'It has unique characteristics.'}
                        {endangeredStatus && endangeredStatus !== "Least Concern" ? ` It is currently listed as ${endangeredStatus}.` : ""}
                    </p>
                </CardContent>
            </Card>

            {similarSpeciesSuggestions && similarSpeciesSuggestions.length > 0 && (
              <section>
                <h3 className="font-headline text-xl mb-3">Visually Similar Species</h3>
                <ScrollArea className="h-[300px] pr-3">
                <div className="space-y-4">
                  {similarSpeciesSuggestions.map((s, i) => (
                    <Card key={i} className="flex gap-3 p-3 items-start">
                      <Image src={s.image} alt={s.name} width={60} height={60} className="rounded border object-cover aspect-square" data-ai-hint={`${s.name} animal plant`} />
                      <div>
                        <h5 className="font-semibold text-sm">{s.name}</h5>
                        <p className="text-xs italic text-muted-foreground">{s.latinName}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
                </ScrollArea>
              </section>
            )}
          </aside>

        </CardContent>
        <CardFooter className="p-6 bg-muted/10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t">
          <ShareButtons url={shareUrl} title={shareText} />
          <Link href="/identify" passHref>
            <Button variant="outline">
              <Trees className="mr-2 h-4 w-4" /> Identify Another
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
