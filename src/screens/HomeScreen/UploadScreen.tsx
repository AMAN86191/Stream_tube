import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../../context/ThemeContext';
import StatesBarPage from '../../utility/StatesBarPage';

const UploadScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [videoUri, setVideoUri] = useState(null);
  const [videoType, setVideoType] = useState(null); // 'short' or 'full'

  const { theme, toggleTheme, isDarkMode } = useTheme();

  const pickVideo = async () => {
    launchImageLibrary({ mediaType: 'video' }, (res) => {
      if (res.assets && res.assets[0]?.uri) {
        setVideoUri(res.assets[0].uri);
        setVideoType(null); // Reset type on new selection
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatesBarPage barColar={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text style={[styles.header, { color: theme.text }]}>Upload Video</Text>

      <TouchableOpacity style={[styles.videoPicker, { backgroundColor: theme.inputBackground }]} onPress={pickVideo}>
        {videoUri ? (
          <Image source={{ uri: videoUri }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="cloud-upload-outline" size={40} color={theme.placeholder} />
            <Text style={{ color: theme.placeholder }}>Select Video</Text>
          </View>
        )}
      </TouchableOpacity>

      {videoUri && !videoType && (
        <View style={styles.typeSelectRow}>
          <TouchableOpacity
            style={[styles.typeButton, { backgroundColor: theme.primary }]}
            onPress={() => setVideoType('short')}
          >
            <Text style={styles.typeButtonText}>Upload as Short</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, { backgroundColor: theme.primary }]}
            onPress={() => setVideoType('full')}
          >
            <Text style={styles.typeButtonText}>Upload Full Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {videoType && (
        <Text style={{ color: theme.text, marginBottom: 10 }}>
          Selected: {videoType === 'short' ? 'Short Video' : 'Full Video'}
        </Text>
      )}

      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
        placeholder="Enter Title"
        placeholderTextColor={theme.placeholder}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea, { backgroundColor: theme.inputBackground, color: theme.text }]}
        placeholder="Enter Description"
        placeholderTextColor={theme.placeholder}
        value={desc}
        onChangeText={setDesc}
        multiline
        numberOfLines={4}
      />

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text }]}>Public</Text>
        <Switch value={isPublic} onValueChange={setIsPublic} />
      </View>

      <TouchableOpacity
        style={[styles.uploadBtn, { backgroundColor: theme.primary }]}
        onPress={() => {
          if (!videoType) {
            alert('Please select video type: Short or Full');
            return;
          }

          console.log({
            title,
            desc,
            videoUri,
            isPublic,
            videoType,
          });

          // Your upload API call goes here
        }}
      >
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoPicker: {
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholder: {
    alignItems: 'center',
  },
  input: {
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  uploadBtn: {
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  typeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});