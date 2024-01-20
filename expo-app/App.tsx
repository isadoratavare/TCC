import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Map from "./src/components/Map";

import { LocationProvider } from "./src/hooks/useLocation";

import ModalBottom from "./src/components/ModalBottom";
import ImageGallery from "./src/components/ImageGallery";
import { Pin } from "./src/@types/map";
import { ImageGalleryProvider } from "./src/hooks/useImageGallery";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMarker, setModalMarker] = useState<Pin | null>();

  try {
    return (
      <LocationProvider>
        <ImageGalleryProvider>
          <View style={styles.container}>
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
  catch (e) {
    return <View>Error</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: " 100%",
  },
});
