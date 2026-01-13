import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import type { ReactNode } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Extend Firebase User with optional role
export interface ExtendedUser extends User {
  role?: "admin" | "user";
}

interface AuthContextType {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Create Firestore doc with default role
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            role: "user",
            createdAt: serverTimestamp(),
          });
          setUser({ ...currentUser, role: "user" });
        } else {
          const data = userSnap.data();
          setUser({ ...currentUser, role: data.role });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
