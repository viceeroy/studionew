'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, X } from 'lucide-react';
import { identifySpecies } from '@/ai/flows/identify-species';
import type { IdentifySpeciesOutput } from '@/ai/flows/identify-species';
import { SpeciesIdentificationResultCard } from './species-identification-result-card';
import { useToast } from '@/hooks/use-toast';


export function SpeciesIdentifierForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifySpeciesOutput | null>(null);
  const { toast } = useToast();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null); // Clear previous result
      setError(null); // Clear previous error
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!photoFile || !photoPreview) {
      setError('Please select a photo to identify.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const photoDataUri = photoPreview; // Already in Data URI format from FileReader
      const response = await identifySpecies({ photoDataUri });
      setResult(response);
      toast({
        title: "Species Identified!",
        description: `Successfully identified: ${response.identification.commonName}`,
      });
    } catch (err) {
      console.error('Error identifying species:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during identification.');
      toast({
        title: "Identification Failed",
        description: "Could not identify the species. Please try another photo or check the image quality.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setResult(null);
    setError(null);
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = ""; // Reset file input
    }
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">Identify Species</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="photo-upload" className="mb-2 block font-medium">Upload Photo</Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={isLoading}
                className="file:font-medium file:text-primary file:bg-primary-foreground hover:file:bg-primary/10"
              />
              <p className="text-xs text-muted-foreground mt-1">Upload an existing photo or capture a new one.</p>
            </div>

            {photoPreview && (
              <div className="mt-4 relative group">
                <Image
                  src={photoPreview}
                  alt="Photo preview"
                  width={500}
                  height={300}
                  className="rounded-md object-contain max-h-[300px] w-full border"
                  data-ai-hint="nature preview"
                />
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={clearPhoto}
                    aria-label="Clear photo"
                >
                    <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || !photoFile}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Identifying...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Identify Species
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <SpeciesIdentificationResultCard result={result} originalPhotoUrl={photoPreview || ''} />
      )}
    </div>
  );
}
