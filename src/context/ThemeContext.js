import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('app-theme', newTheme);
  };

  // Colores de tu paleta
  const colors = {
    bg:           theme === 'dark' ? '#1e202c' : '#f5f6fa',
    card:         theme === 'dark' ? '#31323e' : '#ffffff',
    accent:       '#60519b',
    accentLight:  '#8b7fc7',
    accentHover:  '#4d4180',
    textPrimary:  theme === 'dark' ? '#f0f1f7' : '#111111',
    textSecondary:theme === 'dark' ? '#bfc0d1' : '#777777',
    border:       theme === 'dark' ? 'rgba(191,192,209,0.15)' : 'rgba(0,0,0,0.06)',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};