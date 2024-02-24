/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, createContext, useContext, useEffect } from 'react';
import performance from 'react-native-performance';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import Share from 'react-native-share';
import useMapsService from '../services/maps';
import { ImageGalleryContextProps, useImageGallery } from './useImageGallery';
import { LocationContextProps, useLocation } from './useLocation';

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
    const { getAutoCompleteList, getPlaceGeometry } = useMapsService();

    const { addImage } = useImageGallery() as ImageGalleryContextProps;
    const { addLocation } = useLocation() as LocationContextProps;


    const filePath = RNFS.ExternalDirectoryPath + '/data.txt';
    async function getTimeData(markName: string, fn: () => void): Promise<number> {
        performance.mark(markName);
        await fn();
        performance.measure('myMeasure', markName);
        const data = performance.getEntriesByName('myMeasure');
        createDataFile();
        return data[0].duration;
    }

    async function createDataFile() {
        if (!await RNFS.exists(filePath)) {
            await RNFS.writeFile(filePath, JSON.stringify({}));
        }
    }

    async function addNewValueToJSON(value: any, metric: string) {
        let existingContent = '{}';

        try {
            const content = await RNFS.readFile(filePath);
            existingContent = content;
        } catch (e) {
            console.log(e);
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

            await RNFS.writeFile(filePath, JSON.stringify(existingObject));

            Alert.alert('Coleta n° ' + existingObject[metric].times);
        } else {
            Alert.alert('Dados de ', metric + ' coletados.');
            const isLocationComplete = existingObject?.location?.times >= 30;
            const isCameraComplete = existingObject?.camera?.times >= 30;
            const isGalleryComplete = existingObject?.gallery?.times >= 30;
            if (isLocationComplete && isCameraComplete && isGalleryComplete) {
                Alert.alert('Valores captados', 'Deseja baixar o arquivo?', [{
                    text: 'Baixar',
                    onPress: () => downloadJSON(),
                }]);
            }
        }
    }

    const downloadJSON = async () => {
        Share.open({
            url: 'file://' + filePath,
            type: 'application/txt',
            saveToFiles: true,
        });
    };
    async function addPin(placeName: string) {
        const image = 'https://revistaazul.voeazul.com.br/wp-content/uploads/2023/03/Recife-1.jpg';
        const autoComplete = await getAutoCompleteList(placeName);
        const placeId = autoComplete[0].id;
        await addLocation(placeId);
        await addImage(placeId, image);
    }

    async function addPinsFlow() {
        var cidadesPernambuco = [
            'Recife',
            'Caruaru',
            'Olinda',
            'Garanhuns',
            'Petrolina',
            'Paulista',
            'Jaboatão dos Guararapes',
            'Cabo de Santo Agostinho',
            'Camaragibe',
            'Vitória de Santo Antão',
        ];
        for (let cidade of cidadesPernambuco) {
            addPin(cidade);
        }

    }

    useEffect(() => {
        addPinsFlow();
    }, []);
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
