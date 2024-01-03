import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";
import { Pin, Region } from "../@types/map";
import useMapsService from "../services/maps";
import * as FileSystem from "expo-file-system";
import { Share } from "react-native";
import * as Updates from "expo-updates";
export interface LocationContextProps {
  pins: Pin[];
  addPin: (pin: Pin) => void;
  initialLocation: Region | undefined;
  addLocation: (id: string) => void;
  appendDataToJsonArray: (newValue: string) => void;
  downloadJSON: () => void;
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
  
  const fileUri = `${FileSystem.documentDirectory}performance_data.json`;

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

  const appendDataToJsonArray = async (newValue: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      let jsonData = { performanceData: [], times: 0 } as {
        performanceData: number[];
        times: number;
      };

      if (fileInfo.exists) {
        const existingContent = await FileSystem.readAsStringAsync(fileUri);

        try {
          jsonData = JSON.parse(existingContent);
        } catch (jsonError) {
          console.error("Erro ao analisar JSON existente:", jsonError);
        }
      }

      if (
        !jsonData.performanceData ||
        !Array.isArray(jsonData.performanceData)
      ) {
        jsonData.performanceData = [];
        jsonData.times = 0;
      }

      jsonData.performanceData.push(parseFloat(newValue));
      jsonData.times += 1;

      const updatedContent = JSON.stringify(jsonData, null, 2);

      await FileSystem.writeAsStringAsync(fileUri, updatedContent);

      const restartApp = async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await Updates.reloadAsync();
      };
      console.log(jsonData.times)
      if (jsonData.times < 10) {
        restartApp();
      } else {
        downloadJSON()
      }
    } catch (error) {
      console.error("Erro ao escrever/adicionar dados em arquivo:", error);
    }
  };

  const downloadJSON = async () => {
    try {
      let conteudoExistente = {};
      try {
        const leituraArquivo = await FileSystem.readAsStringAsync(fileUri);
        conteudoExistente = JSON.parse(leituraArquivo);
      } catch (error) {
        // Se o arquivo não existir, pode ser ignorado
      }
      

      const novoConteudo = { ...conteudoExistente };
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(novoConteudo)
      );

      Share.share({ url: fileUri });
    } catch (error) {
      console.error("Erro:", error);
    }
  };
  return (
    <LocationContext.Provider
      value={{
        pins,
        addPin,
        initialLocation,
        addLocation,
        appendDataToJsonArray,
        downloadJSON,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
