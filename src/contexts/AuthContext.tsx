import { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged, signOut } from "../lib/firebase";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: { id: string; name: string; email: string; photoURL?: string; isDemo?: boolean } | null;
  firebaseUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserContext: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  logout: async () => {},
  updateUserContext: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLocalDemo, setIsLocalDemo] = useState(localStorage.getItem("claimlens_demo_mode") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      // If we have a real user, ensure local demo is off
      if (fbUser) {
        setIsLocalDemo(false);
        localStorage.removeItem("claimlens_demo_mode");
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const user = firebaseUser
    ? {
        id: firebaseUser.uid,
        name: firebaseUser.isAnonymous ? "Demo User" : (firebaseUser.displayName || firebaseUser.email || "User"),
        email: firebaseUser.email || (firebaseUser.isAnonymous ? "demo@claimlens.com" : ""),
        photoURL: firebaseUser.photoURL || undefined,
        isDemo: firebaseUser.isAnonymous,
      }
    : isLocalDemo 
    ? {
        id: "mock-demo-id",
        name: "Demo User",
        email: "demo@claimlens.com",
        isDemo: true,
      }
    : null;

  const logout = async () => {
    setIsLocalDemo(false);
    localStorage.removeItem("claimlens_demo_mode");
    await signOut(auth);
  };

  const updateUserContext = () => {
    // Check localStorage again
    setIsLocalDemo(localStorage.getItem("claimlens_demo_mode") === "true");
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
}
