import { ReactNode, createContext, useContext } from "react";
import performance from "react-native-performance";
import * as FileSystem from "expo-file-system";
import * as Updates from "expo-updates";
import { Alert, Share } from "react-native";

export interface MetricsContextProps {
  getTimeData: (markName: string, fn: () => void) => number;
  addNewValueToJSON: (value: any, metric: string) => void;
  downloadJSON: () => void;
}

const MetricsContext = createContext<MetricsContextProps | undefined>(
  undefined
);

export const MetricsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const fileUri = `${FileSystem.documentDirectory}data-perfomance.json`;

  function getTimeData(markName: string, fn: () => void): number {
    performance.mark(markName);
    fn();
    performance.measure("myMeasure", markName);
    const data = performance.getEntriesByName("myMeasure");
    createDataFile();
    return data[0].duration;
  }

  async function createDataFile() {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({}));
    }
  }

  async function addNewValueToJSON(value: any, metric: string) {
    const existingContent = await FileSystem.readAsStringAsync(fileUri);

    let times = 0;
    let existingObject: { [key: string]: any } = {};

    try {
      existingObject = JSON.parse(existingContent);
      times = existingObject.times;
    } catch (error) {
      existingObject = {};
      times = 0;
    }
    if (!existingObject[metric]) {
      existingObject[metric] = { data: [], times: 0 };
    }
    existingObject[metric].data.push(value);
    existingObject[metric].times += 1;

    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify(existingObject)
    );

    const restartApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await Updates.reloadAsync();
    };

    if (existingObject[metric].times < 2) {
      //restartApp();
    } else {
      Alert.alert(`Dados da ${metric} coletados!`);
    }
  }

  const downloadJSON = async () => {
    try {
      let conteudoExistente = {};
      try {
        const leituraArquivo = await FileSystem.readAsStringAsync(fileUri);
        conteudoExistente = JSON.parse(leituraArquivo);
      } catch (error) {}

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
