import React from "react";
import { FlatList, View, Image } from "react-native";
import GalleryButton from "../GalleryButton";
import useImageGallery from "../../hooks/useImageGallety";

const ImageGallery: React.FC = () => {
  const { addImage, photoUri } = useImageGallery();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <FlatList
        data={photoUri}
        renderItem={({ item }: any) => {
          return (
            <>
              {item && (
                <Image
                  source={{ uri: item }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </>
          );
        }}
      />
      <GalleryButton
        icon="add-photo-alternate"
        name="Adicionar lembrança"
        onPress={() => {
          addImage();
        }}
      />
    </View>
  );
};

export default ImageGallery;
