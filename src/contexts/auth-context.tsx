
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  // Placeholder for auth functions, to be implemented later
  // loginWithEmail: (email, password) => Promise<void>;
  // signupWithEmail: (email, password) => Promise<void>;
  // logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if auth object is valid (i.e., if Firebase was initialized correctly)
    if (auth && Object.keys(auth).length > 0 && typeof auth.onAuthStateChanged === 'function') {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // Firebase not initialized or auth service unavailable
      setLoading(false); // Stop loading, user will remain null
      console.warn('Firebase Auth is not available. User authentication will not work.');
    }
  }, []);

  const value = { 
    user, 
    loading 
    // Add stub functions here later e.g.
    // loginWithEmail: async () => { console.log('Login not implemented'); },
    // signupWithEmail: async () => { console.log('Signup not implemented'); },
    // logout: async () => { console.log('Logout not implemented'); },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
