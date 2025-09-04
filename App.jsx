import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import AuthRoute from './src/navigation/AuthRoute';
import { VideoProvider } from './src/context/VideoContext';

export default function App() {
  const isAuthenticated = true;

  return (
    <VideoProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AuthRoute isAuthenticated={isAuthenticated} />
        </NavigationContainer>
      </ThemeProvider>
    </VideoProvider>
  );
}
