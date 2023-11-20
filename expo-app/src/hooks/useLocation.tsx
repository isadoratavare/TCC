import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
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
  const [makers, setMarkers] = useState<Pin[]>([])

  const { getPlaceGeometry } = useMapsService();

  const addPin = (pin: Pin) => {
    console.log(pin);
    // setPins([...pins, pin]);
  };

  async function addLocation(id: string) {
    const geo = await getPlaceGeometry(id);

    const region: Region = {
      latitude: geo?.lat,
      longitude: geo?.lng,
      latitudeDelta: 0.2,
      longitudeDelta: 0.1,
    };
    setInitialLocation(region);
  }

  return (
    <LocationContext.Provider
      value={{ pins, addPin, initialLocation, addLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
