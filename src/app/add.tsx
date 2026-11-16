import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useItems } from '@/context/ItemsContext';

type Coords = { latitude: number; longitude: number };

export default function AddScreen() {
  const { addItem } = useItems();
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [coords, setCoords] = useState<Coords | undefined>();

  const canSave = title.trim() !== '' && place.trim() !== '';

  async function pickPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access is needed to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.5 });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function useMyLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location access was refused.');
      return;
    }
    const position = await Location.getCurrentPositionAsync({});
    setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  }

  function save() {
    if (!canSave) return;
    addItem({ title: title.trim(), place: place.trim(), photoUri, ...coords });
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="What did you find?"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Where?"
        value={place}
        onChangeText={setPlace}
      />

      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}

      <View style={styles.row}>
        <Pressable style={styles.secondary} onPress={pickPhoto}>
          <Text>Choose photo</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={takePhoto}>
          <Text>Take photo</Text>
        </Pressable>
      </View>

      <Pressable style={styles.secondary} onPress={useMyLocation}>
        <Text>
          {coords
            ? `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
            : 'Use my location'}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, !canSave && styles.buttonDisabled]}
        onPress={save}
        disabled={!canSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    gap: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  photo: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  secondary: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});