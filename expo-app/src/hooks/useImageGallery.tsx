import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as ImagePicker from "expo-image-picker";
export interface ImageGalleryContextProps {
  photos: { id: string; uris: string[] }[];
  addImageByGallery: (placeId: string) => void;
  addImageByCamera: (placeId: string) => void;
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
  const [permissionCamera, setPermissionCamera] = useState(false)


  async function hasPermissionGallery() {

    const permissionReq =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setPermission(permissionReq.status === "granted");
  }
  async function hasPermissionCamera() {
    let permission = await ImagePicker.getCameraPermissionsAsync();

    if (!permission.granted) {
      permission = await ImagePicker.requestCameraPermissionsAsync();
    }

    setPermissionCamera(permission.status === "granted");
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
    await hasPermissionGallery()
    if (permission) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        addImage(placeId, result.assets[0].uri);
      }
    }
  }
  async function addImageByCamera(placeId: string) {
    let photoUri;
    await hasPermissionCamera()
    if (permissionCamera) {
       const photo = (await ImagePicker.launchCameraAsync({
         aspect: [4, 3],
         quality: 1,
       })) as any;
       photoUri = photo;
    }
    if (photoUri) {
      addImage(photoUri, placeId)
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
