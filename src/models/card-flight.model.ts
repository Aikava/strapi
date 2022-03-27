import { TGetFlights } from 'src/services/api-service';

export class CardFlightModel {
  uid!: string;
  id!: string;
  code!: string;
  name!: string;
  destinationPlanet!: string;
  departures!: number;

  constructor(data: object) {
    Object.assign(this, data);
  }
}

export function toCardFlightModel(flight: TGetFlights): CardFlightModel {
  const data = {
    uid: flight.launchSite.uid,
    id: flight.launchSite.id,
    destinationPlanet: flight.landingSite.planet.name,
    departures: flight.count,
    name: flight.launchSite.name
  };

  return new CardFlightModel(data);
}
