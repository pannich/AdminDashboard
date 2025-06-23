// src/contexts/RefreshContext.tsx
import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the context type
interface RefreshContextType {
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
export const RefreshContext = createContext<RefreshContextType>({
  refresh: 0,
  setRefresh: () => {},
});

// Create the provider component
export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refresh, setRefresh] = useState(0);

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
