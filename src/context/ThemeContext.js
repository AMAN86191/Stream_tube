// src/context/ThemeContext.js

import React, { createContext, useState, useContext } from 'react';
import { DarkTheme, LightTheme } from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);