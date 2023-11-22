import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "./src/components/Map";

import SearchBar from "./src/components/SearchBar";
import { LocationProvider } from "./src/hooks/useLocation";

import ModalBottom from "./src/components/ModalBottom";
import ImageGallery from "./src/components/ImageGallery";
import { Pin } from "./src/@types/map";
import { ImageGalleryProvider } from "./src/hooks/useImageGallery";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMarker, setModalMarker] = useState<Pin | null>();

  return (
    <LocationProvider>
      <ImageGalleryProvider>
        <View style={styles.container}>
          <SearchBar />
          <Map
            onPressMarker={(marker: Pin) => {
              if (!isModalOpen) {
                setIsModalOpen(true);
              }
              setModalMarker(marker);
            }}
          />
        </View>
        {isModalOpen && (
          <ModalBottom isOpen={isModalOpen} setOpen={setIsModalOpen}>
            <ImageGallery placeId={modalMarker?.place_id || ""} />
          </ModalBottom>
        )}
      </ImageGalleryProvider>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: " 100%",
  },
});
