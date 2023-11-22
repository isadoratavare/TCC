import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocale, { LocaleHook } from "../hooks/useLocale";
import { LocationContextProps, useLocation } from "../hooks/useLocation";
import { Pin } from "../@types/map";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MapRefType = MapView | null;

const Map: React.FC<{ onPressMarker: (pin: Pin) => void }> = ({
  onPressMarker,
}) => {
  const { getLocaleAsync, errorMsg, location } = useLocale() as LocaleHook;
  const { initialLocation, pins } = useLocation() as LocationContextProps;
  const mapRef = useRef<MapRefType>(null);

  function openZoomMap() {
    if (pins.length > 0 && mapRef.current) {
      mapRef?.current?.fitToCoordinates(pins, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }

  useEffect(() => {
    getLocaleAsync();
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
      <MapView
        style={styles.map}
        region={initialLocation || initial}
        ref={mapRef}
      >
        {pins.map((pin: Pin) => {
          return (
            <Marker
              key={pin.place_id}
              coordinate={{
                latitude: pin?.latitude || 0,
                longitude: pin?.longitude || location?.coords.longitude || 0,
              }}
              title={pin.label}
              description=""
              onPress={() => onPressMarker(pin)}
            ></Marker>
          );
        })}
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "white",
            margin: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "gray"
          }}
          onPress={() => openZoomMap()}
        >
          <MaterialCommunityIcons name="fullscreen-exit" size={24} color="black" />

        </TouchableOpacity>
      </MapView>
    );
  }
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: " 100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default Map;
