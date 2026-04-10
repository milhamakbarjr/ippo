import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  language: 'id' | 'en';
} | null;

type AuthContextValue = {
  user: AuthUser;
  isLoading: boolean;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSession() {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refetch: fetchSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
