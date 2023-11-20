import React, { useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocale, { LocaleHook } from "../hooks/useLocale";
import { LocationContextProps, useLocation } from "../hooks/useLocation";
import { Pin } from "../@types/map";

type MapRefType = MapView | null

const Map: React.FC = () => {
  const { getLocaleAsync, errorMsg, location } = useLocale() as LocaleHook;
  const { initialLocation, pins } = useLocation() as LocationContextProps;
  const mapRef = useRef<MapRefType>(null);
  
  useEffect(() => {
    getLocaleAsync()
    if (pins.length > 0 && mapRef.current) {
      const coordinates = pins.map(marker => ({
        latitude: marker.latitude,
        longitude: marker.longitude,
      }));

      mapRef?.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, 
        animated: true,
      });
    }
  }, [pins]);
  
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  if (location) {
    const initial = {
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return (
      <MapView style={styles.map} initialRegion={initialLocation || initial} ref={mapRef} >
        {pins.map((pin: Pin) => {
          return (
            <Marker
              key={pin.place_id}
              coordinate={{
                latitude: pin?.latitude || 0,
                longitude: pin?.longitude || location?.coords.longitude || 0,
              }}
              title="Minha Localização"
              description="Estou aqui!"
            />
          );
        })}
      </MapView>
    );
  }
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: " 100%",
  },
});

export default Map;
