import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useVideo } from '../../context/VideoContext';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const videoHeight = width * (9 / 16);

const VideoPlayerScreen = ({ route }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const lastUpdateRef = useRef(0);

  const { video, position } = route.params;
  const { setCurrentVideo, setIsMinimized, currentTime, setCurrentTime } =
    useVideo();

  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [resumePosition, setResumePosition] = useState(position ?? currentTime);

  const relatedVideos = [
    {
      id: '2',
      title: 'JavaScript for Beginners (2024)',
      channel: 'Tech Simplified',
      views: '900K views',
      time: '1 week ago',
      thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
      channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
      videoSource: 'https://example.com/video2.mp4',
    },
    {
      id: '3',
      title: 'Python Crash Course 💻',
      channel: 'Learn With Me',
      views: '2.3M views',
      time: '5 days ago',
      thumbnail: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
      channelLogo: 'https://cdn-icons-png.flaticon.com/512/10041/10041008.png',
      videoSource: 'https://example.com/video3.mp4',
    },
  ];

  useEffect(() => {
    setCurrentVideo(video);
    setIsMinimized(true);
    setResumePosition(position ?? currentTime);
  }, [video, position, currentTime]);

  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  const handleProgress = useCallback(
    data => {
      setProgress(data.currentTime);
      const now = Date.now();
      if (now - lastUpdateRef.current > 500) {
        lastUpdateRef.current = now;
        setCurrentTime(data.currentTime);
      }
    },
    [setCurrentTime],
  );

  const handleLoad = data => {
    setDuration(data.duration);
    setLoading(false);
    if (videoRef.current && resumePosition > 0) {
      videoRef.current.seek(resumePosition);
    }
  };

  const handleEnd = () => {
    setPaused(true);
    setProgress(0);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setPaused(prev => !prev);
    setShowControls(true);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const toggleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderRelatedVideo = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.relatedCard}
        onPress={() =>
          navigation.replace('VideoPlayer', { video: item, position: 0 })
        }
      >
        <Image source={{ uri: item.thumbnail }} style={styles.relatedThumb} />
        <View style={styles.relatedInfo}>
          <Text
            style={[styles.relatedTitle, { color: theme.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text style={[styles.relatedChannel, { color: theme.subtext }]}>
            {item.channel}
          </Text>
          <Text style={[styles.relatedMeta, { color: theme.subtext }]}>
            {item.views} • {item.time}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [theme, navigation],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        barStyle={
          fullscreen
            ? 'light-content'
            : theme.mode === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={fullscreen ? '#000' : theme.background}
      />

      {/* Video Player */}
      <View
        style={[styles.videoContainer, fullscreen && styles.fullscreenVideo]}
      >
        <Video
          ref={videoRef}
          source={{ uri: video.videoSource }}
          style={styles.video}
          resizeMode="contain"
          paused={paused}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onEnd={handleEnd}
          onError={error => console.log('Video error:', error)}
          fullscreen={fullscreen}
          fullscreenOrientation="landscape"
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Video Controls */}
        {showControls && (
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.topControls}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.videoTitle} numberOfLines={1}>
              {video.title}
            </Text>
          </LinearGradient>
        )}

        <TouchableOpacity
          style={styles.videoOverlay}
          activeOpacity={1}
          onPress={() => setShowControls(prev => !prev)}
        />

        {showControls && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.bottomControls}
          >
            {/* Progress Bar */}
            <TouchableOpacity
              style={styles.progressBarContainer}
              onPress={e => {
                const tapX = e.nativeEvent.locationX;
                const newTime = (tapX / width) * duration;
                if (videoRef.current && duration > 0) {
                  videoRef.current.seek(newTime);
                  setProgress(newTime);
                  setCurrentTime(newTime);
                }
              }}
            >
              <View
                style={[
                  styles.progressBar,
                  { width: `${(duration ? progress / duration : 0) * 100}%` },
                ]}
              />
              <View
                style={[
                  styles.progressHandle,
                  { left: `${(duration ? progress / duration : 0) * 100}%` },
                ]}
              />
            </TouchableOpacity>

            <View style={styles.controlsRow}>
              <View style={styles.leftControls}>
                <TouchableOpacity onPress={togglePlayPause}>
                  <Icon
                    name={paused ? 'play' : 'pause'}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.timeText}>
                  {formatTime(progress)} / {formatTime(duration)}
                </Text>
              </View>

              <View style={styles.rightControls}>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Icon
                    name={fullscreen ? 'contract' : 'expand'}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        )}
      </View>

      {/* Video Info Section */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={[styles.infoContainer, { backgroundColor: theme.background }]}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            {video.title}
          </Text>

          <View style={styles.videoStats}>
            <Text style={[styles.views, { color: theme.subtext }]}>
              {video.views} views • {video.time}
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Icon
                  name={liked ? 'thumbs-up' : 'thumbs-up-outline'}
                  size={20}
                  color={liked ? theme.primary : theme.subtext}
                />
                <Text
                  style={[
                    styles.actionText,
                    { color: liked ? theme.primary : theme.subtext },
                  ]}
                >
                  125K
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDislike}
              >
                <Icon
                  name={disliked ? 'thumbs-down' : 'thumbs-down-outline'}
                  size={20}
                  color={disliked ? theme.primary : theme.subtext}
                />
                <Text
                  style={[
                    styles.actionText,
                    { color: disliked ? theme.primary : theme.subtext },
                  ]}
                >
                  Dislike
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share-outline" size={20} color={theme.subtext} />
                <Text style={[styles.actionText, { color: theme.subtext }]}>
                  Share
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="download-outline" size={20} color={theme.subtext} />
                <Text style={[styles.actionText, { color: theme.subtext }]}>
                  Download
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="add-outline" size={20} color={theme.subtext} />
                <Text style={[styles.actionText, { color: theme.subtext }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Channel Info */}
          <View
            style={[styles.channelContainer, { borderColor: theme.border }]}
          >
            <View style={styles.channelInfo}>
              <Image
                source={{ uri: video.channelLogo }}
                style={styles.channelLogo}
              />
              <View style={styles.channelText}>
                <Text style={[styles.channelName, { color: theme.text }]}>
                  {video.channel}
                </Text>
                <Text style={[styles.subscribers, { color: theme.subtext }]}>
                  1.2M subscribers
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.subscribeButton,
                subscribed && { backgroundColor: theme.inputBackground },
              ]}
              onPress={toggleSubscribe}
            >
              <Text
                style={[
                  styles.subscribeText,
                  subscribed && { color: theme.text },
                ]}
              >
                {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Video Description */}
          <View style={styles.descriptionContainer}>
            <Text
              style={[styles.description, { color: theme.text }]}
              numberOfLines={3}
            >
              {video.description || 'No description available'}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.showMore, { color: theme.subtext }]}>
                Show more
              </Text>
            </TouchableOpacity>
          </View>

          {/* Comments Preview */}
          <View style={styles.commentsHeader}>
            <Text style={[styles.commentsTitle, { color: theme.text }]}>
              4,823 Comments
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <MaterialIcons name="sort" size={20} color={theme.subtext} />
              <Text style={[styles.sortText, { color: theme.subtext }]}>
                Sort by
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add Comment */}
          <View style={styles.addComment}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.userAvatar}
            />
            <TouchableOpacity
              style={[styles.commentInput, { borderColor: theme.border }]}
            >
              <Text
                style={[styles.commentPlaceholder, { color: theme.subtext }]}
              >
                Add a comment...
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sample Comment */}
          <View style={styles.comment}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/women/1.jpg',
              }}
              style={styles.commentAvatar}
            />
            <View style={styles.commentContent}>
              <Text style={[styles.commentName, { color: theme.text }]}>
                Jane Doe
              </Text>
              <Text style={[styles.commentText, { color: theme.text }]}>
                This tutorial was really helpful! Thanks for the clear
                explanations.
              </Text>
              <View style={styles.commentActions}>
                <TouchableOpacity style={styles.commentAction}>
                  <Icon
                    name="thumbs-up-outline"
                    size={16}
                    color={theme.subtext}
                  />
                  <Text
                    style={[styles.commentActionText, { color: theme.subtext }]}
                  >
                    245
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentAction}>
                  <Icon
                    name="thumbs-down-outline"
                    size={16}
                    color={theme.subtext}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={[styles.commentActionText, { color: theme.subtext }]}
                  >
                    Reply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Related Videos */}
          <Text style={[styles.relatedTitle, { color: theme.text }]}>
            Up next
          </Text>

          <FlatList
            data={relatedVideos}
            renderItem={renderRelatedVideo}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={7}
            removeClippedSubviews
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: videoHeight,
    backgroundColor: '#000',
    position: 'relative',
  },
  fullscreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    zIndex: 100,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    marginRight: 16,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  progressBarContainer: {
    height: 3,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'red',
  },
  progressHandle: {
    position: 'absolute',
    top: -5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoStats: {
    marginBottom: 16,
  },
  views: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    minWidth: 60,
  },
  actionText: {
    fontSize: 12,
    marginTop: 5,
  },
  channelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  channelLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  channelText: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscribers: {
    fontSize: 13,
    marginTop: 2,
  },
  subscribeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  descriptionContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  showMore: {
    fontSize: 14,
    marginTop: 8,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    marginLeft: 4,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  commentPlaceholder: {
    fontSize: 14,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  commentActionText: {
    fontSize: 12,
    marginLeft: 4,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  relatedCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  relatedThumb: {
    width: 160,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  relatedInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  relatedChannel: {
    fontSize: 13,
    marginBottom: 2,
  },
  relatedMeta: {
    fontSize: 12,
  },
});

export default React.memo(VideoPlayerScreen);
