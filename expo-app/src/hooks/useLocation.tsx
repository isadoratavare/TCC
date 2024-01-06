import { createContext, useContext, ReactNode, useState } from "react";
import { Pin, Region } from "../@types/map";
import useMapsService from "../services/maps";

export interface LocationContextProps {
  pins: Pin[];
  addPin: (pin: Pin) => void;
  initialLocation: Region | undefined;
  addLocation: (id: string) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [initialLocation, setInitialLocation] = useState<Region | undefined>();

  const { getPlaceGeometry } = useMapsService();

  const addPin = (pin: Pin) => {
    setPins((prevState) => [...prevState, pin]);
  };

  async function addLocation(id: string) {
    const geo = await getPlaceGeometry(id);

    const region: Region = {
      latitude: geo?.latitude,
      longitude: geo?.longitude,
      latitudeDelta: geo?.latitudeDelta,
      longitudeDelta: geo?.longitudeDelta,
    };

    const pin: Pin = {
      place_id: geo?.id,
      latitude: geo?.latitude,
      longitude: geo?.longitude,
      latitudeDelta: geo?.latitudeDelta,
      longitudeDelta: geo?.longitudeDelta,
      label: geo?.name,
    };
    addPin(pin);
    setInitialLocation(region);
  }

  return (
    <LocationContext.Provider
      value={{
        pins,
        addPin,
        initialLocation,
        addLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
