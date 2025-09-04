import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import StatesBarPage from '../../utility/StatesBarPage';
import Homeheader from '../../components/Homeheader';

const notifications = [
  {
    id: '1',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    message: 'Code with Aman uploaded: React Native Full Tutorial 🔥',
    time: '2 hours ago',
    thumbnail: 'https://i.ytimg.com/vi/0-S5a0eXPoc/maxresdefault.jpg',
  },
  {
    id: '2',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    message: 'Tech Guru uploaded: JavaScript in 1 Hour | Beginner Guide',
    time: '4 hours ago',
    thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
  },
  {
    id: '3',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    message: 'Learn With Me uploaded: Python for Absolute Beginners 🐍',
    time: '1 day ago',
    thumbnail: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
  },
];

const NotificationScreen = () => {
  const { theme } = useTheme();

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <Image source={{ uri: item.channelLogo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={[styles.message, { color: theme.text }]} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={[styles.time, { color: theme.subtext }]}>{item.time}</Text>
      </View>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
    </View>
  );

  return (
    <>
      <StatesBarPage barColar={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* <Homeheader /> */}
        <Text style={[styles.title, { color: theme.text }]}>Notifications</Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
  thumbnail: {
    width: 80,
    height: 45,
    borderRadius: 4,
    marginLeft: 10,
  },
});
