import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateChannelScreen = ({ navigation }) => {
  const [channelName, setChannelName] = useState('');
  const [handle, setHandle] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = () => {
    const channelData = {
      name: channelName,
      handle,
      description,
      logo,
      banner,
      joinDate: new Date().toDateString(),
    };

    // Save to backend or Redux
    console.log('Channel Created:', channelData);
    navigation.goBack(); // Or redirect to channel screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Channel</Text>

      <TextInput
        placeholder="Channel Name"
        value={channelName}
        onChangeText={setChannelName}
        style={styles.input}
      />

      <TextInput
        placeholder="Handle (e.g. @yourchannel)"
        value={handle}
        onChangeText={setHandle}
        style={styles.input}
      />

      <TextInput
        placeholder="Channel Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Text style={styles.label}>Logo</Text>
      <TouchableOpacity onPress={() => pickImage(setLogo)} style={styles.imagePicker}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.image} />
        ) : (
          <Text>Pick Logo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Banner</Text>
      <TouchableOpacity onPress={() => pickImage(setBanner)} style={styles.imagePicker}>
        {banner ? (
          <Image source={{ uri: banner }} style={styles.bannerImage} />
        ) : (
          <Text>Pick Banner</Text>
        )}
      </TouchableOpacity>

      <Button title="Create Channel" onPress={handleCreate} />
    </ScrollView>
  );
};

export default CreateChannelScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    height: 120,
    marginBottom: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  bannerImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
});
