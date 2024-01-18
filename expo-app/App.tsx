import React, {  useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "./src/components/Map";

import { LocationProvider } from "./src/hooks/useLocation";
import { MetricsProvider } from "./src/hooks/useMetrics";

import ModalBottom from "./src/components/ModalBottom";
import ImageGallery from "./src/components/ImageGallery";
import { Pin } from "./src/@types/map";
import { ImageGalleryProvider } from "./src/hooks/useImageGallery";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMarker, setModalMarker] = useState<Pin | null>();

  return (
    <MetricsProvider>
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
    </MetricsProvider>
  );
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
