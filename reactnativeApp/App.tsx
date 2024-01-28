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

enableLatestRenderer();

function App(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMarker, setModalMarker] = useState<Pin | null>();

  return (
    <LocationProvider>
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Map onPressMarker={(marker: Pin) => {
          if (!isModalOpen) {
            setIsModalOpen(true);
          }
          setModalMarker(marker);
        }} />
      </View>
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
