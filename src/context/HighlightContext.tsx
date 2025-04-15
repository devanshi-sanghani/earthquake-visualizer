import { createContext, useContext, useState } from 'react';

const HighlightContext = createContext<{
  highlightedId: string | null;
  setHighlightedId: (id: string | null) => void;
} | null>(null);

export const HighlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  return (
    <HighlightContext.Provider value={{ highlightedId, setHighlightedId }}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlightContext = () => {
  const ctx = useContext(HighlightContext);
  if (!ctx) throw new Error('useHighlightContext must be used within a HighlightProvider');
  return ctx;
};
