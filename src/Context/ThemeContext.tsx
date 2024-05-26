// src/Context/ThemeContext.tsx
import React, { createContext, FC, ReactNode } from 'react';
import { Theme } from 'src/Theme/theme.d';
import { theme } from 'src/Theme/theme';

export const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};