import React, { ReactNode, createContext, useContext, useState } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export interface ImageGalleryContextProps {
  photos: { id: string; uris: string[] }[];
  addImageByGallery: (placeId: string) => void;
  addImageByCamera: (ref: any, placeId: string) => void;
}

const ImageGalleryContext = createContext<ImageGalleryContextProps | undefined>(
  undefined
);

export const ImageGalleryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [photoUri, setPhotoUri] = useState<{ id: string; uris: string[] }[]>(
    []
  );
  async function hasPermissionGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    return status === "granted";
  }
  async function hasPermissionCamera() {
    const [permission, requestPermission] = Camera.useCameraPermissions();

    await requestPermission();

    return permission?.granted;
  }

  async function addImage(placeId: string, uri: string) {
    const existingIndex = photoUri.findIndex((item) => item.id === placeId);

    if (existingIndex !== -1) {
      setPhotoUri((prevImageData) => {
        const updatedImageData = [...prevImageData];
        updatedImageData[existingIndex].uris.push(uri);
        return updatedImageData;
      });
    } else {
      setPhotoUri((prevImageData) => [
        ...prevImageData,
        { id: placeId, uris: [uri] },
      ]);
    }
  }
  async function addImageByGallery(placeId: string) {
    if (await hasPermissionGallery()) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        addImage(placeId, result.assets[0].uri)
      }
    }
  }
  async function addImageByCamera(ref: any, placeId: string) {
    if (await hasPermissionCamera()) {
      if (ref.current) {
        const { uri } = await ref.current.takePictureAsync();
        addImage(placeId, uri)
      }
    }
  }
  return (
    <ImageGalleryContext.Provider
      value={{ addImageByGallery, photos: photoUri, addImageByCamera }}
    >
      {children}
    </ImageGalleryContext.Provider>
  );
};

export const useImageGallery = () => {
  return useContext(ImageGalleryContext);
};
