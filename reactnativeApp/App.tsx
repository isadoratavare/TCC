/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { LocationProvider } from './src/hooks/useLocation';
import { enableLatestRenderer } from 'react-native-maps';
import Map from './src/components/Map';
import { Pin } from './src/@types/map';
import { ImageGalleryProvider } from './src/hooks/useImageGallery';
import ModalBottom from './src/components/ModalBottom';
import ImageGallery from './src/components/ImageGallery';

enableLatestRenderer();

function App(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMarker, setModalMarker] = useState<Pin | null>();

  return (
    <LocationProvider>
      <ImageGalleryProvider>
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
          <Map onPressMarker={(marker: Pin) => {
            if (!isModalOpen) {
              setIsModalOpen(true);
            }
            setModalMarker(marker);
          }} />
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
  container: { flex: 1 },
  map: {
    flex: 1,
    width: '100%',
    height: ' 100%',
  },
});

export default App;
