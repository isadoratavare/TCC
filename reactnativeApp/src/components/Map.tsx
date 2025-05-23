/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Pin } from '../@types/map';
import useLocale, { LocaleHook } from '../hooks/useLocale';
import { LocationContextProps, useLocation } from '../hooks/useLocation';
import SearchBar from './SearchBar';
import DecentralizedButton from './DecentralizedButton';
import { ImageGalleryContextProps, useImageGallery } from "../hooks/useImageGallery";

type MapRefType = MapView | null;

const Map: React.FC<{ onPressMarker: (pin: Pin) => void }> = ({
    onPressMarker,
}) => {
    const { getLocaleAsync, errorMsg, location } = useLocale() as LocaleHook;
    const { initialLocation, pins } =
        useLocation() as LocationContextProps;
    const { photos } = useImageGallery() as ImageGalleryContextProps

    const mapRef = useRef<MapRefType>(null);

    useEffect(() => {
        onPressMarker(pins[photos.length - 1]);
    }, [photos]);
    
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


    const initial = {
        latitude: location?.coords.latitude || 0,
        longitude: location?.coords.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    return (
        <View style={[StyleSheet.absoluteFillObject, { flex: 1 }]}>
            <MapView
                ref={mapRef}
                style={[styles.map, StyleSheet.absoluteFillObject]}
                region={initialLocation || initial}
            >
                {pins.map((pin: Pin) => {
                    return (
                        <Marker
                            key={pin.place_id}
                            coordinate={{
                                latitude: pin?.latitude || 0,
                                longitude: pin?.longitude || location?.coords.longitude || 0,
                            }}
                            title={pin?.label}
                            description=""
                            onPress={() => {
                                onPressMarker(pin);
                            }}
                        />
                    );
                })}
            </MapView>
            <SearchBar />
            <DecentralizedButton openZoomMap={openZoomMap} />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: ' 100%',
    },
});

export default Map;
