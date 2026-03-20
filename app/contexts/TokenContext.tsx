'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TokenContextType {
  tokens: number;
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
}

const TokenContext = createContext<TokenContextType | null>(null);

const STORAGE_KEY = 'casino_tokens';
const INITIAL_TOKENS = 1000;

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setTokens(parseInt(saved, 10));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, tokens.toString());
    }
  }, [tokens, loaded]);

  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };

  const spendTokens = (amount: number): boolean => {
    if (tokens < amount) return false;
    setTokens(prev => prev - amount);
    return true;
  };

  return (
    <TokenContext.Provider value={{ tokens, addTokens, spendTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const ctx = useContext(TokenContext);
  if (!ctx) throw new Error('useTokens must be used inside TokenProvider');
  return ctx;
}
