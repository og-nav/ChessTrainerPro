import React, { createContext, useState } from 'react';

export const primary = {
  0: '#FFFFFF',
  50: '#ECEFF1',
  100: '#CFD8DC',
  200: '#B0BEC5',
  300: '#90A4AE',
  400: '#78909C',
  500: '#607D8B',
  600: '#546E7A',
  700: '#455A64',
  800: '#37474F',
  900: '#263238',
};

export const defaultColors = {
  dark: {
    view: primary[900],
    text: primary[50],
    pressable: primary[500],
  },
  light: {
    view: primary[50],
    text: primary[900],
    pressable: primary[400],
  },
};

type Theme = 'light' | 'dark';

export const switch_track_color = {
  true: primary[200],
  false: primary[600],
};

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
