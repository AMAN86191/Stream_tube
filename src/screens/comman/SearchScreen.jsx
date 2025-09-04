import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import StatesBarPage from '../../utility/StatesBarPage';

const mockResults = [
  {
    id: '1',
    title: 'React Native Full Tutorial 🔥',
    channel: 'Code with Aman',
    views: '1.2M views',
    time: '2 days ago',
    thumbnail: 'https://i.ytimg.com/vi/0-S5a0eXPoc/maxresdefault.jpg',
  },
  {
    id: '2',
    title: 'JavaScript for Beginners (2024)',
    channel: 'Tech Simplified',
    views: '900K views',
    time: '1 week ago',
    thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
  },
  {
    id: '3',
    title: 'Python Crash Course 💻',
    channel: 'Learn With Me',
    views: '2.3M views',
    time: '5 days ago',
    thumbnail: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
  },
];

const SearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { borderBottomColor: theme.border }]}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.meta, { color: theme.subtext }]}>
          {item.channel} • {item.views} • {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
            <StatesBarPage barColar={theme.mode === 'dark' ? 'light-content' : 'dark-content'} bgColor={theme.mode === 'dark' ? theme.background : theme.background} />

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* 🔍 Search Input */}
        <View style={[styles.searchBar, { backgroundColor: theme.card }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme.placeholder}
            value={query}
            onChangeText={setQuery}
            style={[styles.input, { color: theme.text }]}
          />
          <Icon name="search-outline" size={22} color={theme.text} />
        </View>

        {/* 📃 Search Results */}
        <FlatList
          data={mockResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    // paddingVertical: 10,
    margin: 12,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 16,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  thumbnail: {
    width: 140,
    height: 80,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  meta: {
    fontSize: 13,
    marginTop: 4,
  },
});
