import { SpeciesIdentifierForm } from '@/components/feature/identify-species/species-identifier-form';

export default function IdentifyPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Unveil Nature's Secrets</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
          Upload a photo of a plant or animal, and let our AI reveal its identity and fascinating details.
        </p>
      </header>
      <SpeciesIdentifierForm />
    </div>
  );
}
