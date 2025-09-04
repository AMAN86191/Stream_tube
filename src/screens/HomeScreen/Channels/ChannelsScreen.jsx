// src/screens/ChannelsScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

const dummyChannels = [
  {
    id: '1',
    name: 'CodeWithAman',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    subscribers: '1.2K Subscribers',
  },
  {
    id: '2',
    name: 'Dev Daily',
    avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
    subscribers: '3.1K Subscribers',
  },
];

const ChannelsScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const renderChannel = ({ item }) => (
    <TouchableOpacity
      style={[styles.channelCard, { backgroundColor: theme.inputBackground }]}
      onPress={() => navigation.navigate('ChannelProfile', { channel: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.subscribers, { color: theme.subtext }]}>{item.subscribers}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
      <FlatList
        data={dummyChannels}
        keyExtractor={(item) => item.id}
        renderItem={renderChannel}
      />
    </View>
  );
};

export default ChannelsScreen;

const styles = StyleSheet.create({
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  subscribers: {
    fontSize: 13,
  },
});
