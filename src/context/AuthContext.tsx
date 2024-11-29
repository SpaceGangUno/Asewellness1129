import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import * as firestoreService from '../services/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      setError('Authentication is not configured. Please check your environment variables.');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userData = {
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
          };
          await firestoreService.createUser(user.uid, userData);
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error('Authentication is not configured');
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userData = {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
      };
      await firestoreService.createUser(user.uid, userData);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Authentication is not configured');
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    if (!auth) {
      throw new Error('Authentication is not configured');
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);

      const userData = {
        id: user.uid,
        email: user.email || '',
        name: name,
      };
      await firestoreService.createUser(user.uid, userData);
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (!auth?.currentUser) {
      throw new Error('No authenticated user');
    }

    if (!auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
      }
    }
  };

  const signOut = async () => {
    if (!auth) {
      throw new Error('Authentication is not configured');
    }

    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      signInWithGoogle, 
      signInWithEmail,
      signUpWithEmail,
      signOut,
      sendVerificationEmail
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}