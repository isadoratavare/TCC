import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, Image, Modal, Text } from "react-native";
import GalleryButton from "../GalleryButton";
import {
  ImageGalleryContextProps,
  useImageGallery,
} from "../../hooks/useImageGallery";
import CameraView from "../CameraView";
import { Camera } from "expo-camera";

const ImageGallery: React.FC<{ placeId: string; openCamera: () => void }> = ({
  placeId,
}) => {
  const [cameraOrGalleryModalOpen, setCameraOrGalleryModalOpen] =
    useState<boolean>(false);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const { addImageByGallery, photos } =
    useImageGallery() as ImageGalleryContextProps;

  const photosData = photos.filter((photo) => photo.id === placeId)[0];

  useEffect(() => {
    async function getPermission() {
      if (isCameraOpen && permission?.status === 'undetermined') {
        await requestPermission();
      }
    }
    getPermission()
  }, [isCameraOpen])


  if (isCameraOpen && permission?.granted) {
    return (
      <CameraView placeId={placeId} onClose={() => setIsCameraOpen(false)}/>
    );
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <FlatList
        data={photosData?.uris}
        ListHeaderComponent={() => (
          <GalleryButton
            icon="add-photo-alternate"
            name="Adicionar lembrança"
            onPress={() => {
              setCameraOrGalleryModalOpen(true);
            }}
          />
        )}
        renderItem={({ item }: any) => {
          return (
            <View>
              {item && (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                />
              )}
            </View>
          );
        }}
        horizontal
      />

      {cameraOrGalleryModalOpen && (
        <Modal transparent={true} visible={cameraOrGalleryModalOpen}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#3A3A3A4D",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 250,
                height: 130,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <GalleryButton
                icon="insert-photo"
                name="Galeria"
                onPress={async () => {
                  await addImageByGallery(placeId);
                  setCameraOrGalleryModalOpen(false);
                }}
              />
              <GalleryButton
                icon="camera-alt"
                name="Câmera"
                onPress={ () => {
                  setIsCameraOpen(true)
                  setCameraOrGalleryModalOpen(false);
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ImageGallery;
