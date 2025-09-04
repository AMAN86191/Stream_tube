import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ShortScreen from '../screens/HomeScreen/ShortScreen';
import SubscriptionScreen from '../screens/HomeScreen/SubscriptionScreen';
import LibraryScreen from '../screens/HomeScreen/LibraryScreen';
import UploadScreen from '../screens/HomeScreen/UploadScreen';
import SettingScreen from '../screens/Settings/SettingScreen';

import { useTheme } from '../context/ThemeContext'; // ✅ your custom ThemeContext
import NotificationScreen from '../screens/comman/NotificationScreen';
import SearchScreen from '../screens/comman/SearchScreen';
import VideoPlayerScreen from '../screens/comman/VideoPlayerScreen';
import ChannelProfileScreen from '../screens/HomeScreen/Channels/ChannelProfileScreen';
import ChannelsScreen from '../screens/HomeScreen/Channels/ChannelsScreen';
import History from '../screens/LaibaryScreen/History';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🏠 Home Stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="ChannelProfileScreen" component={ChannelProfileScreen} />
      <Stack.Screen name="ChannelsScreen" component={ChannelsScreen} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

// 📱 Tab Routes
const TabRoutes = () => {
  const { theme } = useTheme(); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: theme.card, 
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Shorts') iconName = focused ? 'flash' : 'flash-outline';
          else if (route.name === 'Upload') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Subscriptions') iconName = focused ? 'albums-outline' : 'albums';
          else if (route.name === 'Library') iconName = focused ? 'library' : 'library-outline';

          return <Icon name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,       
        tabBarInactiveTintColor: theme.subtext,     
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontFamily: 'Roboto',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Shorts" component={ShortScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Subscriptions" component={SubscriptionScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
};

export default TabRoutes;
