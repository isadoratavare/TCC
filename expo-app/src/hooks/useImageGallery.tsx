import React, { ReactNode, createContext, useContext, useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export interface ImageGalleryContextProps {
  photos: { id: string; uris: string[] }[];
  addImageByGallery: (placeId: string) => void;
  addImageByCamera: (placeId: string, photo: CameraCapturedPicture) => void;
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
  
  async function addImage(placeId: string, uri: string) {
    console.log("addImage", placeId, uri);

    const existingIndex = photoUri.findIndex((item) => item.id === placeId);

    if (existingIndex !== -1) {
      console.log(`Adding ${placeId}`);
      setPhotoUri((prevImageData) => {
        const updatedImageData = [...prevImageData];
        updatedImageData[existingIndex].uris.push(uri);
        return updatedImageData;
      });
    } else {
      console.log(`Creating ${placeId}`);
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
      console.log(result);
      if (!result.canceled) {
        addImage(placeId, result.assets[0].uri);
      }
    }
  }
  async function addImageByCamera(
    placeId: string,
    photo: CameraCapturedPicture
  ) {
    addImage(placeId, photo.uri);
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
