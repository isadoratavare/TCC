export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Location = {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    timestamp: Number, 
    accuracy: Number,
    altitudeAccuracy: Number,
    speed: Number,
  }

export type Place = {
  id: string;
  name: string;
  description: string;
}

export type Pin =  {
  latitude: number;
  longitude: number;
  label: string;
  place_id: string;
}