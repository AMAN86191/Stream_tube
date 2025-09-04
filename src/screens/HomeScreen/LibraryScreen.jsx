import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatesBarPage from '../../utility/StatesBarPage';
import Settingheader from '../../components/Settingheader';
import { useTheme } from '../../context/ThemeContext';
import HomeHeader from '../../components/Homeheader';

const { width } = Dimensions.get('window');

const menuData = [
  { id: '1', icon: 'time-outline', title: 'History', link: 'History' },
  { id: '2', icon: 'download-outline', title: 'Downloads', link: 'History' },
  { id: '3', icon: 'timer-outline', title: 'Watch Later', link: 'History' },
  { id: '4', icon: 'list-outline', title: 'Your Playlists', link: 'History' },
];

const recentVideos = [
  {
    id: '1',
    title: 'Learn React Native in 10 Minutes!',
    channel: 'CodeWithAman',
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
  },
  {
    id: '2',
    title: 'JavaScript ES2025: What’s New?',
    channel: 'JSPro',
    thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
  },
];

const LibraryScreen = () => {
  const { theme, isDarkMode } = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => item.link}>
      <Icon name={item.icon} size={24} color={theme.text} style={styles.menuIcon} />
      <Text style={[styles.menuText, { color: theme.text }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderRecent = ({ item }) => (
    <View style={styles.recentVideo}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.videoChannel, { color: theme.placeholder }]}>
          {item.channel}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.background }]}>
      {/* <StatesBarPage barColar={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <HomeHeader />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent</Text>
        <FlatList
          data={recentVideos}
          keyExtractor={(item) => item.id}
          renderItem={renderRecent}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  recentVideo: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: width * 0.35,
    height: width * 0.2,
    borderRadius: 8,
    backgroundColor: '#333',
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  videoChannel: {
    fontSize: 13,
    marginTop: 4,
  },
});
