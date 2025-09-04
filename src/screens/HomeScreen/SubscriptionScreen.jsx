import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Homeheader from '../../components/Homeheader';
import StatesBarPage from '../../utility/StatesBarPage';
import { useTheme } from '../../context/ThemeContext'; // ✅ Import your theme hook

const channels = [
  { id: '1', name: 'Aman Tech', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'React Daily', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: '3', name: 'CodeMate', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', name: 'JS World', avatar: 'https://i.pravatar.cc/100?img=4' },
];

const videos = [
  {
    id: '1',
    title: 'React Native vs Flutter 🔥 Which One to Choose?',
    channel: 'Aman Tech',
    views: '1.2M views',
    time: '3 days ago',
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: '2',
    title: 'JavaScript 2025 - What’s New?',
    channel: 'JS World',
    views: '900K views',
    time: '1 week ago',
    thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
    avatar: 'https://i.pravatar.cc/100?img=4',
  },
];

const SubscriptionScreen = () => {
  const { theme } = useTheme(); // ✅ Access theme colors

  const renderVideo = ({ item }) => (
    <View style={styles.videoCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.meta, { color: theme.subtext }]}>
            {item.channel} • {item.views} • {item.time}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={18} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* <StatesBarPage barColar="" /> */}
      <Homeheader />

      {/* Horizontal scroll of subscriptions */}
      <View style={[styles.subHeader, { backgroundColor: theme.card }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {channels.map((channel) => (
            <View key={channel.id} style={styles.channelStory}>
              <Image source={{ uri: channel.avatar }} style={styles.channelAvatar} />
              <Text style={[styles.channelName, { color: theme.text }]} numberOfLines={1}>
                {channel.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* List of videos */}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideo}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subHeader: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  channelStory: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  channelAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 12,
    textAlign: 'center',
  },
  videoCard: {
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#222',
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    marginTop: 4,
  },
});
