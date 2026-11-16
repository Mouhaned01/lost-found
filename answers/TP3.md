R1) "@react-native-async-storage/async-storage": "2.2.0"
"expo-image-picker": "~58.0.10",
"expo-location": "~58.0.22"

R2)Without the if (loaded) check, the second useEffect would run immediately on the initial render while items is still initialized as an empty array ([]). It would overwrite and wipe out all previously saved data in AsyncStorage with [] before the first useEffect finishes reading the saved items from the device.

R3)result.canceled contains the boolean value true (and result.assets is null)

R4)Opening the camera gives the app direct access to live hardware sensors that can record the user's surroundings without explicit per-action selection, requiring runtime OS permission. By contrast, launchImageLibraryAsync uses the system's built-in Photo Picker, where the user explicitly selects and hands over only specific images to the app, so the app never gets broad access to the entire photo library.

R5)

R6)When an item is saved without GPS coordinates, item.latitude is undefined, so React skips rendering that link.



