import * as ImagePicker from "expo-image-picker";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ImageGalleryContextProps {
  addImage: (placeId: string) => void;
  photos: { id: string; uris: string[] }[];
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

  useEffect(() => {
    console.log(photoUri);
  }, [photoUri]);

  async function hasPermissionGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      return true;
    }

    return false;
  }
  async function addImage(placeId: string) {
    if (await hasPermissionGallery()) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        const existingIndex = photoUri.findIndex((item) => item.id === placeId);

        if (existingIndex !== -1) {
          setPhotoUri((prevImageData) => {
            const updatedImageData = [...prevImageData];
            updatedImageData[existingIndex].uris.push(result.assets[0].uri);
            return updatedImageData;
          });
        } else {
          setPhotoUri((prevImageData) => [
            ...prevImageData,
            { id: placeId, uris: [result.assets[0].uri] },
          ]);
        }
      }
    }
  }

  return (
    <ImageGalleryContext.Provider value={{ addImage, photos: photoUri }}>
      {children}
    </ImageGalleryContext.Provider>
  );
};

export const useImageGallery = () => {
  return useContext(ImageGalleryContext);
};
