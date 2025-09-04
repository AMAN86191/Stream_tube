import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import StatesBarPage from '../utility/StatesBarPage';

const { width } = Dimensions.get('window');

const HomeHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <>
        <StatesBarPage barColar={theme.mode === 'dark' ? 'light-content' : 'dark-content'} bgColor={theme.mode === 'dark' ? theme.background : theme.background} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons name="menu" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.logoText, { color: theme.primary }]}>SnapTube</Text>
        </View>

        <View style={styles.headerRight}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="cast" size={22} color={theme.text} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('NotificationScreen')}>
            <Ionicons name="notifications-outline" size={22} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('SearchScreen')}>
            <Ionicons name="search" size={22} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar */}
      <Modal animationType="slide" transparent visible={menuVisible} onRequestClose={toggleMenu}>
        <Pressable style={styles.overlay} onPress={toggleMenu} />
        <View style={[styles.sidebarContainer, { backgroundColor: theme.card, width: width * 0.8 }]}>
          <View style={[styles.sidebarHeader, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={toggleMenu}>
              <MaterialIcons name="menu" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.sidebarLogoText, { color: theme.primary }]}>SnapTube</Text>
          </View>

          <ScrollView style={styles.menuScroll}>
            {[
              { icon: 'home', label: 'Home', screen: 'Home' },
              { icon: 'explore', label: 'Explore', screen: 'Explore' },
              { icon: 'subscriptions', label: 'Subscriptions', screen: 'Subscriptions' },
              { icon: 'video-library', label: 'Library', screen: 'Library' },
              { icon: 'history', label: 'History', screen: 'Library' },
              // { icon: 'ondemand-video', label: 'Your Videos', screen: 'Library' },
              { icon: 'watch-later', label: 'Watch Later', screen: 'Library' },
              { icon: 'thumb-up-alt', label: 'Liked Videos', screen: 'Library' },
              { icon: 'settings', label: 'Settings', screen: 'SettingScreen' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate(item.screen);
                }}
              >
                <MaterialIcons name={item.icon} size={24} color={theme.text} style={styles.menuIcon} />
                <Text style={[styles.menuText, { color: theme.text }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <Text style={[styles.sectionTitle, { color: theme.text }]}>SUBSCRIPTIONS</Text>
            {[
              { name: 'PewDiePie', icon: 'account-circle' },
              { name: 'MrBeast', icon: 'account-circle' },
              { name: 'T-Series', icon: 'account-circle' },
              { name: '5-Minute Crafts', icon: 'account-circle' },
            ].map((channel, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Channel', { channelName: channel.name });
                }}
              >
                <MaterialIcons name={channel.icon} size={24} color={theme.text} style={styles.menuIcon} />
                <Text style={[styles.menuText, { color: theme.text }]}>{channel.name}</Text>
              </TouchableOpacity>
            ))}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Settings');
              }}
            >
              <MaterialIcons name="settings" size={24} color={theme.text} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: theme.text }]}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
              <MaterialIcons
                name={theme.mode === 'dark' ? 'light-mode' : 'dark-mode'}
                size={24}
                color={theme.text}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, { color: theme.text }]}>
                {theme.mode === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  sidebarLogoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuScroll: {
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 24,
  },
  menuText: {
    fontSize: 15,
  },
  divider: {
    height: 1,
    marginVertical: 8,
    opacity: 0.4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    letterSpacing: 0.5,
  },
});

export default HomeHeader;
