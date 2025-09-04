import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import StatesBarPage from '../../utility/StatesBarPage';
import Homeheader from '../../components/Homeheader';
import { useTheme } from '../../context/ThemeContext';
import { useVideo } from '../../context/VideoContext';

const screenWidth = Dimensions.get('window').width;

const mockVideos = [
  {
    id: '1',
    title: 'React Native Full Tutorial 🔥',
    channel: 'Code with Aman',
    views: '1.2M views',
    time: '2 days ago',
    thumbnail: 'https://i.ytimg.com/vi/0-S5a0eXPoc/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: '2',
    title: 'JavaScript in 1 Hour | Beginner Guide',
    channel: 'Tech Guru',
    views: '500K views',
    time: '1 week ago',
    thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  },
  {
    id: '3',
    title: 'Build a Netflix Clone with React',
    channel: 'Dev Simplified',
    views: '850K views',
    time: '3 weeks ago',
    thumbnail: 'https://i.ytimg.com/vi/XtMThy8QKqU/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
  },
  {
    id: '4',
    title: 'Mastering Git & GitHub in 30 Minutes',
    channel: 'CodeVerse',
    views: '400K views',
    time: '1 month ago',
    thumbnail: 'https://i.ytimg.com/vi/RGOj5yH7evk/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '5',
    title: 'Python for Absolute Beginners 🐍',
    channel: 'Learn With Me',
    views: '950K views',
    time: '5 days ago',
    thumbnail: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '6',
    title: 'Top 10 VSCode Extensions for Developers',
    channel: 'Coder Tips',
    views: '1M views',
    time: '3 weeks ago',
    thumbnail: 'https://i.ytimg.com/vi/MlIzFUI1QGA/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
  {
    id: '7',
    title: 'Flutter vs React Native in 2025',
    channel: 'Mobile Dev Show',
    views: '620K views',
    time: '2 months ago',
    thumbnail: 'https://i.ytimg.com/vi/fq4N0hgOWzU/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
  },
  {
    id: '8',
    title: 'How the Internet Works 🌐',
    channel: 'Tech Simplified',
    views: '2.3M views',
    time: '6 months ago',
    thumbnail: 'https://i.ytimg.com/vi/x3c1ih2NJEg/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
  },
  {
    id: '9',
    title: 'Learn TypeScript in 60 Minutes',
    channel: 'TS Mastery',
    views: '390K views',
    time: '4 weeks ago',
    thumbnail: 'https://i.ytimg.com/vi/30LWjhZzg50/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: '10',
    title: 'Responsive Web Design with HTML & CSS',
    channel: 'Frontend Pro',
    views: '1.7M views',
    time: '1 year ago',
    thumbnail: 'https://i.ytimg.com/vi/srvUrASNj0s/maxresdefault.jpg',
    channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
    videoSource:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
];

const HomeScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const {
    currentVideo,
    isMinimized,
    setIsMinimized,
    setCurrentVideo,
    currentTime,
    setCurrentTime,
  } = useVideo();

  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleVideoPress = item => {
    // setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('VideoPlayer', { video: item });
    }, 500);
  };

  const renderSkeleton = () => (
    <SkeletonPlaceholder
      backgroundColor={theme.card}
      highlightColor={theme.border}
    >
      {[...Array(5)].map((_, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <View style={{ width: '100%', height: 200, borderRadius: 8 }} />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20 }} />
            <View style={{ marginLeft: 10 }}>
              <View style={{ width: 200, height: 12, borderRadius: 4 }} />
              <View
                style={{
                  width: 150,
                  height: 12,
                  marginTop: 6,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVideoPress(item)}>
      <View style={styles.videoCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.videoInfo}>
          <TouchableOpacity
            onPress={() => {
              const channelVideos = mockVideos.filter(
                v => v.channel === item.channel,
              );
              navigation.navigate('ChannelProfileScreen', {
                channel: {
                  name: item.channel,
                  logo: item.channelLogo,
                  subscribers: item.subscribers,
                  videos: channelVideos,
                },
              });
            }}
          >
            <Image
              source={{ uri: item.channelLogo }}
              style={styles.channelLogo}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.videoTitle, { color: theme.text }]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text style={[styles.videoMeta, { color: theme.placeholder }]}>
              {item.channel} • {item.views} • {item.time}
            </Text>
          </View>
          <Icon name="ellipsis-vertical" size={18} color={theme.text} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* <StatesBarPage barColar={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <Homeheader />

      {skeletonLoading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={mockVideos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      )}

      {isMinimized && currentVideo && (
        <TouchableOpacity
          onPress={() => {
            setIsMinimized(false);
            setIsPaused(true);
            navigation.navigate('VideoPlayer', {
              video: currentVideo,
              position: currentTime,
            });
          }}
          activeOpacity={1}
          style={[styles.miniPlayerContainer, { backgroundColor: theme.card }]}
        >
          <Video
            source={{ uri: currentVideo.videoSource }}
            style={styles.miniPlayer}
            resizeMode="cover"
            paused={isPaused}
            onProgress={({ currentTime }) => setCurrentTime(currentTime)}
          />
          <View style={styles.miniTextContainer}>
            <Text
              style={[styles.miniTitle, { color: theme.text }]}
              numberOfLines={1}
            >
              {currentVideo.title}
            </Text>
            <Text style={[styles.miniMeta, { color: theme.subtext }]}>
              {' '}
              {currentVideo.channel}{' '}
            </Text>
          </View>
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
              <Icon
                name={isPaused ? 'play' : 'pause'}
                size={22}
                color={theme.text}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsMinimized(false)}
              style={{ marginLeft: 12 }}
            >
              <Icon name="close" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoCard: {
    marginBottom: 14,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#222',
    // borderRadius: 8,
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  channelLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  videoMeta: {
    fontSize: 13,
    marginTop: 4,
  },
  miniPlayerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 10,
    zIndex: 10,
  },
  miniPlayer: {
    width: 100,
    height: 56,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  miniTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  miniTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  miniMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});
