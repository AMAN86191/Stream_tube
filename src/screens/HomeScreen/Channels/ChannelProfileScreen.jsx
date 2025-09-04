import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

const ChannelProfileScreen = ({ route, navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { channel } = route.params;
  const [activeTab, setActiveTab] = useState('Videos');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeMenu, setShowSubscribeMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'Videos', icon: 'grid' },
    { id: 'Shorts', icon: 'play-circle' },
    { id: 'Live', icon: 'radio' },
    { id: 'Playlists', icon: 'list' },
    { id: 'Community', icon: 'message-circle' },
    { id: 'About', icon: 'info' }
  ];

  const getFilteredContent = () => {
    switch(activeTab) {
      case 'Videos': return channel.videos;
      case 'Shorts': return channel.shorts || [];
      case 'Live': return channel.liveStreams || [];
      case 'Playlists': return channel.playlists || [];
      case 'Community': return channel.communityPosts || [];
      case 'About': return [channel.about] || [];
      default: return [];
    }
  };

  const renderContentItem = ({ item }) => {
    switch(activeTab) {
      case 'Videos':
      case 'Shorts':
        return (
          <TouchableOpacity 
            style={[styles.videoCard, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate('VideoPlayer', { video: item })}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.videoThumb}
              resizeMode="cover"
            />
            <View style={styles.videoInfoContainer}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={[styles.videoMeta, { color: theme.subtext }]}>
                  {item.views} • {item.timeAgo}
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="more-vert" size={20} color={theme.subtext} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      
      case 'Live':
        return (
          <TouchableOpacity style={[styles.liveCard, { backgroundColor: theme.card }]}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.videoThumb}
              resizeMode="cover"
            />
            <View style={styles.videoInfoContainer}>
              <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={[styles.videoMeta, { color: theme.subtext }]}>
                {item.viewers} watching
              </Text>
            </View>
          </TouchableOpacity>
        );
      
      case 'Playlists':
        return (
          <TouchableOpacity style={[styles.playlistCard, { backgroundColor: theme.card }]}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.playlistThumb}
              resizeMode="cover"
            />
            <View style={styles.playlistInfo}>
              <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={[styles.videoMeta, { color: theme.subtext }]}>
                {item.videoCount} videos • Updated {item.lastUpdated}
              </Text>
            </View>
          </TouchableOpacity>
        );
      
      case 'Community':
        return (
          <View style={[styles.communityCard, { backgroundColor: theme.card }]}>
            <View style={styles.communityHeader}>
              <Image
                source={{ uri: channel.logo }}
                style={styles.communityChannelLogo}
              />
              <Text style={[styles.communityDate, { color: theme.subtext }]}>
                {item.postedAgo}
              </Text>
            </View>
            <Text style={[styles.communityText, { color: theme.text }]}>
              {item.text}
            </Text>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.communityImage}
                resizeMode="contain"
              />
            )}
            <View style={styles.communityActions}>
              <TouchableOpacity style={styles.communityAction}>
                <MaterialIcons name="thumb-up" size={18} color={theme.subtext} />
                <Text style={[styles.communityActionText, { color: theme.subtext }]}>
                  {item.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.communityAction}>
                <MaterialIcons name="chat-bubble" size={18} color={theme.subtext} />
                <Text style={[styles.communityActionText, { color: theme.subtext }]}>
                  {item.comments}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'About':
        return (
          <View style={[styles.aboutCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
            <Text style={[styles.aboutText, { color: theme.text }]}>
              {/* {item.description} */}
              Code with harry
            </Text>
            
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Details</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={18} color={theme.subtext} />
              <Text style={[styles.detailText, { color: theme.subtext }]}>
                {/* {item.location || 'Not specified'} */}
                 Code with harry
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="link" size={18} color={theme.subtext} />
              <Text 
                style={[styles.detailText, { color: theme.primary }]}
                onPress={() => Linking.openURL(item.website)}
              >
                {/* {item.website || 'No website'} */}
                 Code with harry
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="date-range" size={18} color={theme.subtext} />
              <Text style={[styles.detailText, { color: theme.subtext }]}>
                Joined  Code with harry
                {/* {item.joinDate} */}

              </Text>
            </View>
            
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Stats</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {channel.subscribers}
                </Text>
                <Text style={[styles.statLabel, { color: theme.subtext }]}>
                  Subscribers
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {channel.totalViews}
                </Text>
                <Text style={[styles.statLabel, { color: theme.subtext }]}>
                  Total views
                </Text>
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView>
        {/* Channel Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: channel.banner || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh9ZaD_4kxcQXEooApj5QRy2GJ-zf4OLrnyg&s" }}
            style={[styles.channelBanner, { backgroundColor: theme.inputBackground }]}
            resizeMode="cover"
          />
          
          <View style={styles.channelHeaderContent}>
            <View style={styles.channelInfoRow}>
              <Image
                source={{ uri: channel.logo }}
                style={[styles.channelLogo, { borderColor: theme.background }]}
              />
              <View style={styles.channelTextInfo}>
                <Text style={[styles.channelName, { color: theme.text }]}>
                  {channel.name}
                </Text>
                <Text style={[styles.channelHandle, { color: theme.subtext }]}>
                  @{channel.handle} Harry 
                </Text>
                <Text style={[styles.channelSubs, { color: theme.subtext }]}>
                  {channel.subscribers} 150 subscribers • {channel.videoCount} 1.2M videos
                </Text>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[
                  styles.subscribeButton, 
                  { 
                    backgroundColor: isSubscribed ? theme.inputBackground : theme.primary,
                    borderColor: isSubscribed ? theme.border : 'transparent'
                  }
                ]}
                onPress={() => setIsSubscribed(!isSubscribed)}
              >
                <Text style={[
                  styles.subscribeButtonText,
                  { color: isSubscribed ? theme.text : '#fff' }
                ]}>
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.notificationButton, { backgroundColor: theme.inputBackground }]}
                onPress={() => setShowSubscribeMenu(!showSubscribeMenu)}
              >
                <MaterialIcons 
                  name={isSubscribed ? "notifications" : "notifications-none"} 
                  size={20} 
                  color={theme.text} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tab Bar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={[styles.tabBar, { borderBottomColor: theme.border }]}
          contentContainerStyle={styles.tabBarContent}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && { 
                  borderBottomWidth: 2, 
                  borderBottomColor: theme.primary 
                }
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Feather 
                name={tab.icon} 
                size={18} 
                color={activeTab === tab.id ? theme.primary : theme.text} 
              />
              <Text style={[
                styles.tabButtonText,
                { color: activeTab === tab.id ? theme.primary : theme.text }
              ]}>
                {tab.id}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Area */}
        <FlatList
          data={getFilteredContent()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderContentItem}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="videocam-off-outline" size={48} color={theme.subtext} />
              <Text style={[styles.emptyText, { color: theme.subtext }]}>
                No {activeTab.toLowerCase()} available
              </Text>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    position: 'relative',
    marginBottom: 8
  },
  channelBanner: {
    width: '100%',
    height: 120
  },
  channelHeaderContent: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  channelInfoRow: {
    flexDirection: 'row',
    marginTop: -30,
    alignItems: 'flex-end',
    marginBottom: 16
  },
  channelLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2
  },
  channelTextInfo: {
    marginLeft: 16,
    flex: 1
  },
  channelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  channelHandle: {
    fontSize: 14,
    marginBottom: 4
  },
  channelSubs: {
    fontSize: 13
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8
  },
  subscribeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  subscribeButtonText: {
    fontWeight: '500',
    fontSize: 14
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    borderBottomWidth: 1,
    height: 48
  },
  tabBarContent: {
    paddingHorizontal: 8
  },
  tabButton: {
    paddingHorizontal: 16,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500'
  },
  videoCard: {
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  videoThumb: {
    width: '100%',
    aspectRatio: 16/9
  },
  videoInfoContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1
  },
  videoMeta: {
    fontSize: 13,
    marginTop: 4
  },
  liveCard: {
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1
  },
  liveBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  playlistCard: {
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  playlistThumb: {
    width: 120,
    height: 70
  },
  playlistInfo: {
    flex: 1,
    padding: 12
  },
  communityCard: {
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    padding: 12
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  communityChannelLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8
  },
  communityDate: {
    fontSize: 12
  },
  communityText: {
    fontSize: 14,
    marginBottom: 12
  },
  communityImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12
  },
  communityActions: {
    flexDirection: 'row',
    gap: 16
  },
  communityAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  communityActionText: {
    fontSize: 13
  },
  aboutCard: {
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8
  },
  detailText: {
    fontSize: 14
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 24
  },
  statItem: {
    alignItems: 'center'
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 13
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16
  }
});

export default ChannelProfileScreen;