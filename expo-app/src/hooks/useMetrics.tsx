import { ReactNode, createContext, useContext } from "react";
import performance from "react-native-performance";
import * as FileSystem from "expo-file-system";
import * as Updates from "expo-updates";
import { Alert } from "react-native";
import * as Sharing from 'expo-sharing';

export interface MetricsContextProps {
  getTimeData: (markName: string, fn: () => void) => Promise<number>;
  addNewValueToJSON: (value: any, metric: string) => void;
  downloadJSON: () => void;
}

const MetricsContext = createContext<MetricsContextProps | undefined>(
  undefined
);

export const MetricsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const fileUri = `${FileSystem.documentDirectory}perfomance_data.json`;

  async function getTimeData(markName: string, fn: () => void): Promise<number> {
    performance.mark(markName);
    await fn();
    performance.measure("myMeasure", markName);
    const data = performance.getEntriesByName("myMeasure");
    createDataFile();
    return data[0].duration;
  }

  async function createDataFile() {
    const fileInfo = await FileSystem.getInfoAsync(fileUri)

    if (!fileInfo?.exists) {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({}));
    }
  }

  async function addNewValueToJSON(value: any, metric: string) {
    let existingContent = '{}'
    try {
       existingContent = await FileSystem.readAsStringAsync(fileUri);
    } catch (e) {
      console.log(e)
    }

    let existingObject: { [key: string]: any } = {};
    existingObject = JSON.parse(existingContent);

    let times = existingObject[metric]?.times || 0;
    if (times < 30) {
      
      try {
        times = existingObject?.times;
      } catch (error) {
        existingObject = {};
        times = 0;
      }

      if (!existingObject[metric]) {
        existingObject[metric] = { data: [], times: 0 };
      }
      existingObject[metric].data.push(value);
      existingObject[metric].times += 1;

      Alert.alert("Coleta nº "+ existingObject[metric].times)

      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(existingObject)
      );
       
      const restartApp = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        //await Updates.reloadAsync();
      };

      restartApp();

    }
    else {
      Alert.alert("Dados de ", metric+ " coletados.")
      const isLocationComplete = existingObject?.location?.times >= 30
      const isCameraComplete = existingObject?.camera?.times >= 30
      const isGalleryComplete = existingObject?.gallery?.times >= 30

      if (isLocationComplete && isCameraComplete && isGalleryComplete) {
        Alert.alert("Valores captados", "Deseja baixar o arquivo?" , [{
          text: 'Baixar',
          onPress: () => downloadJSON(),
        }])
      }
      
      return
    }
  }

  const downloadJSON = async () => {
    try {
      let conteudoExistente = {};
      try {
        const leituraArquivo = await FileSystem.readAsStringAsync(fileUri);
        conteudoExistente = JSON.parse(leituraArquivo);
      } catch (error) { }

      const novoConteudo = { ...conteudoExistente };
      
      FileSystem.writeAsStringAsync(fileUri, JSON.stringify(novoConteudo));
      await Sharing.shareAsync(fileUri, { mimeType: 'text/plain', dialogTitle: 'Download do Log' });
      const file = await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(novoConteudo),
        {}
      );

       console.log(file)
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <MetricsContext.Provider
      value={{ getTimeData, addNewValueToJSON, downloadJSON }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  return useContext(MetricsContext);
};
