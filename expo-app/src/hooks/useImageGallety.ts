import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function useImageGallery() {
  const [photoUri, setPhotoUri] = useState<string[]>([]);

  async function hasPermissionGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      return true;
    }

    return false;
  }

  async function addImage() {
    if (await hasPermissionGallery()) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setPhotoUri((prevState) => [...prevState, result.assets[0].uri]);
      }
    }
  }

  return {
    addImage,
    photoUri,
  };
}
