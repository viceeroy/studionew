'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import Link from "next/link";
import type React from "react"; // Import React for FormEvent type

export default function AuthPage() {
  // Placeholder for actual Firebase login/signup logic
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    alert("Login functionality to be implemented!");
    // In a real app, you would call Firebase auth methods here
    // e.g., signInWithEmailAndPassword(auth, email, password)
    // and then router.push('/discover');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 text-primary mb-4">
            <Leaf className="h-8 w-8" />
            <span className="font-headline font-semibold text-3xl">
              Semurg
            </span>
          </Link>
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>Please sign in to continue exploring nature's wonders.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <Button variant="link" className="p-0 h-auto" asChild><Link href="#">Sign Up (coming soon)</Link></Button>
          </p>
           <p className="mt-2 text-center text-sm text-muted-foreground">
            Or sign in with <Button variant="link" className="p-0 h-auto" asChild><Link href="#">Google (coming soon)</Link></Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
