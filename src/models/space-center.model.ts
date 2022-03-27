import { PlanetModel } from './planet.model';

export type SpaceCenter = {
  id: string;
  uid: string;
  name: string;
  description: string
  latitude: number;
  longitude: number;
  planet: PlanetModel
}
