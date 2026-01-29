import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext<any>(null);

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  card: '#F5F5F5',
  border: '#DDDDDD',
  primary: '#2F80ED',
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#1E1E1E',
  border: '#333333',
  primary: '#2F80ED',
};

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => sub.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
