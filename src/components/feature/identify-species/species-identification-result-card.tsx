import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { IdentifySpeciesOutput } from '@/ai/flows/identify-species';
import { Badge } from '@/components/ui/badge';
import { ShareButtons } from '@/components/shared/share-buttons';
import { ArrowRight, BookOpen, MapPin, Drumstick, Users, ShieldAlert, Leaf, Lightbulb, Globe, Search } from 'lucide-react';

interface SpeciesIdentificationResultCardProps {
  result: IdentifySpeciesOutput;
  originalPhotoUrl: string; // Data URI of the uploaded photo
}

export function SpeciesIdentificationResultCard({ result, originalPhotoUrl }: SpeciesIdentificationResultCardProps) {
  const { identification, habitat, diet, similarSpecies, endangeredStatus, ecologicalNiche, interestingFact, geographicDistribution } = result;

  const detailItems = [
    { icon: MapPin, label: 'Habitat', value: habitat },
    { icon: Drumstick, label: 'Diet', value: diet },
    { icon: Leaf, label: 'Ecological Niche', value: ecologicalNiche },
    { icon: Globe, label: 'Geographic Distribution', value: geographicDistribution },
    { icon: Lightbulb, label: 'Interesting Fact', value: interestingFact },
    ...(endangeredStatus && endangeredStatus.toLowerCase() !== 'least concern' && endangeredStatus.toLowerCase() !== 'n/a' && endangeredStatus.toLowerCase() !== 'not applicable' && endangeredStatus.toLowerCase() !== 'unknown'
      ? [{ icon: ShieldAlert, label: 'Endangered Status', value: endangeredStatus, isBadge: true, variant: 'destructive' as const }]
      : []),
  ];
  
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/species/${encodeURIComponent(identification.latinName)}` : '';
  const shareText = `I identified a ${identification.commonName} using Semurg! Check it out:`;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(identification.commonName + " " + identification.latinName)}`;


  return (
    <Card className="max-w-2xl mx-auto shadow-xl overflow-hidden">
      <CardHeader className="bg-muted/30 p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {originalPhotoUrl && (
            <Image
              src={originalPhotoUrl}
              alt={identification.commonName}
              width={120}
              height={120}
              className="rounded-lg border object-cover aspect-square"
              data-ai-hint="identified species"
            />
          )}
          <div className="flex-1">
            <CardTitle className="font-headline text-3xl mb-1">{identification.commonName}</CardTitle>
            <CardDescription className="italic text-md">{identification.latinName}</CardDescription>
            <div className="mt-2 flex gap-2">
                <Badge variant="secondary">{identification.genus}</Badge>
                <Badge variant="secondary">{identification.species}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {detailItems.map((item, index) => (
          item.value && (
            <div key={index} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">{item.label}</h4>
                {item.isBadge ? (
                  <Badge variant={item.variant || 'default'} className="mt-1">{item.value}</Badge>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                )}
              </div>
            </div>
          )
        ))}
        
        {similarSpecies && similarSpecies.length > 0 && (
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Similar Species</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {similarSpecies.map((sp, i) => (
                  <Badge key={i} variant="outline">{sp}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}

      </CardContent>
      <CardFooter className="p-6 bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <ShareButtons url={shareUrl} title={shareText} />
        <Button asChild>
            <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
                Search Online <Search className="ml-2 h-4 w-4" />
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
