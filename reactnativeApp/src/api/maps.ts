/* eslint-disable prettier/prettier */
import { API_URL } from '../utils/api';
import { Alert } from 'react-native';

import { GOOGLE_MAPS_KEY } from '@env';

function useMapsAPI() {
  async function getAutoComplete(input: string) {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_KEY;
      const url = `${API_URL}/autocomplete/json?input=${encodeURIComponent(input || '')}&key=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na solicitação: ${response.status} - ${errorData.error_message}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      Alert.alert(error?.message || 'Erro ao buscar autocomplete');
      return null;
    }
  }

  async function getPlaceById(input: string) {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_KEY;
      const url = `${API_URL}/details/json?place_id=${encodeURIComponent(
        input || ''
      )}&key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Erro na solicitação: ${response.status} - ${errorData.error_message}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      Alert.alert(error?.message || "Erro ao buscar place by id");
      return null;
    }
  }

  return { getAutoComplete, getPlaceById };
}

export default useMapsAPI;
