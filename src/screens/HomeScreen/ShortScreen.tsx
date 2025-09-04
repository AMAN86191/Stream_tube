import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const { height, width } = Dimensions.get('window');

const reelsData = [
  {
    id: '1',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Amazing Coding Tips',
    channel: 'CodeWithAman',
    likes: 1.2,
    comments: 340,
  },
  {
    id: '2',
    video: 'https://www.w3schools.com/html/movie.mp4',
    title: 'Learn JavaScript Fast!',
    channel: 'JSPro',
    likes: 0.98,
    comments: 212,
  },
];

const ShortScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const { theme } = useTheme();
  const flatListRef = useRef();
  const scale = useRef(new Animated.Value(1)).current;

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = parseInt(viewableItems[0].index);
      setActiveIndex(newIndex);
      // Always play video when it becomes active
      setPaused(false);
    }
  };

  const handleVideoPress = () => {
    // Only toggle pause for the currently active video
    setPaused(prev => !prev);
    
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.reelContainer, { backgroundColor: theme.background }]}>
      <Pressable
        style={styles.videoPressable}
        onPress={handleVideoPress}
      >
        <Animated.View style={[styles.animatedVideoWrapper, { transform: [{ scale }] }]}>
          <Video
            source={{ uri: item.video }}
            style={styles.video}
            resizeMode="cover"
            repeat
            paused={index !== activeIndex || paused}
            muted={muted}
            onBuffer={({ isBuffering: buffering }) => setIsBuffering(buffering)}
            onLoadStart={() => setIsBuffering(true)}
            onLoad={() => setIsBuffering(false)}
            onError={(e) => console.log('Video error:', e)}
          />
        </Animated.View>
      </Pressable>
      
      {isBuffering && index === activeIndex && (
        <ActivityIndicator size="large" color="white" style={styles.loader} />
      )}

      <View style={styles.overlay}>
        <View style={styles.leftOverlay}>
          <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.channel, { color: theme.subtext }]}>@{item.channel}</Text>
        </View>

        <View style={styles.rightOverlay}>
          <ActionIcon name="heart-outline" label={`${item.likes}K`} theme={theme} />
          <ActionIcon name="chatbubble-outline" label={item.comments} theme={theme} />
          <ActionIcon name="arrow-redo-outline" label="Share" theme={theme} />
          <ActionIcon
            name={muted ? 'volume-mute' : 'volume-high-outline'}
            onPress={() => setMuted(!muted)}
            theme={theme}
          />
          <ActionIcon name="ellipsis-vertical" theme={theme} />
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={reelsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 80 }}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      windowSize={3}
    />
  );
};

const ActionIcon = ({ name, label, theme, onPress }) => (
  <TouchableOpacity style={styles.iconBtn} onPress={onPress}>
    <Icon name={name} size={26} color={theme.text} />
    {label && <Text style={[styles.iconText, { color: theme.text }]}>{label}</Text>}
  </TouchableOpacity>
);

export default ShortScreen;

const styles = StyleSheet.create({
  reelContainer: {
    width: '100%',
    height: height,
    position: 'relative',
  },
  videoPressable: {
    flex: 1,
  },
  animatedVideoWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 16,
  },
  leftOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 90,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  channel: {
    fontSize: 14,
    marginBottom: 20,
  },
  rightOverlay: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 95,
  },
  iconBtn: {
    alignItems: 'center',
    marginBottom: 18,
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
  },
  loader: {
    position: 'absolute',
    top: height / 2 - 20,
    alignSelf: 'center',
    zIndex: 1,
  },
});