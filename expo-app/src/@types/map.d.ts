export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Location = {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    timestamp: Number, //Milliseconds since Unix epoch
    accuracy: Number,
    altitudeAccuracy: Number,
    speed: Number,
  }

export type Place = {
  id: string;
  name: string;
  description: string;
}