import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { MetricsContextProps, useMetrics } from "./useMetrics";

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
  const [permission, setPermission] = useState<boolean>(false);
  const { getTimeData, addNewValueToJSON } =
    useMetrics() as MetricsContextProps;
  async function hasPermissionGallery() {
    const timeInMilliseconds = getTimeData("getGalleryPermission", async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setPermission(status === "granted");
    });

    const content = JSON.stringify(timeInMilliseconds, null, 2);

    addNewValueToJSON(content, "gallery");
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
    if (permission) {
      const result = await ImagePicker.launchImageLibraryAsync();
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

  useEffect(() => {
    hasPermissionGallery()
  },[])
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
