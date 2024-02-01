/* eslint-disable prettier/prettier */
import { useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

export type LocaleHook = {
    location: any;
    errorMsg: string;
    getLocaleAsync: () => void;
};

export default function useLocale(): LocaleHook {
    const [location, setLocation] = useState<GeolocationResponse | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    async function getLocaleAsync() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(info => setLocation(info));
        } else {
            setErrorMsg('Camera permission denied');
        }
    }
    return {
        location,
        errorMsg,
        getLocaleAsync,
    };
}
