import React from "react";
import { FlatList, View, Image } from "react-native";
import GalleryButton from "../GalleryButton";
import { ImageGalleryContextProps, useImageGallery } from "../../hooks/useImageGallery";

const ImageGallery: React.FC<{placeId: string}> = ({ placeId }) => {

  const { addImage, photos } = useImageGallery() as ImageGalleryContextProps;

  const photosData = photos.filter(photo => photo.id === placeId)[0]

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <FlatList
        data={photosData?.uris}
        ListHeaderComponent={() => (
          <GalleryButton
            icon="add-photo-alternate"
            name="Adicionar lembrança"
            onPress={() => {
              addImage(placeId);
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
    </View>
  );
};

export default ImageGallery;
