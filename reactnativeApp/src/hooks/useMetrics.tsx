/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, createContext, useContext } from 'react';

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
    function getTimeData(markName: string, fn: () => void): number { }

    async function createDataFile() { }

    async function addNewValueToJSON(value: any, metric: string) { }

    const downloadJSON = async () => { }

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