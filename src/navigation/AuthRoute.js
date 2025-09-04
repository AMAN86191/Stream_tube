import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './routes';
// import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthRoute = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={Routes} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AuthRoute;
