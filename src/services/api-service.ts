import {
  ApolloClient,
  DocumentNode,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables
} from '@apollo/client';
import { PlanetModel } from '../models/planet.model';
import { SpaceCenter } from '../models/space-center.model';
import { PaginationInfo } from '../models/list.model';
import { CardFlightModel, toCardFlightModel } from '../models/card-flight.model';

const GET_SPACE_CENTER_INFO = gql`
    query GetSpaceCenterInfo($uid: String) {
      spaceCenter(uid: $uid) { id, uid, name, longitude, latitude, planet { name } }
    }
  `;

const GET_FLIGHTS = gql`
  query GET_FLIGHTS($departureDay: GraphQLDate, $page: Int, $from: ID, $pageSize: Int) {
    flights(from: $from, departureDay: $departureDay, page: $page, pageSize: $pageSize) {
      pagination { total, pageSize, page }
      nodes {
        launchSite { id, uid, name },
        landingSite { planet { name } } }
    }
  }
`;

type TList<T> = {
  pagination: PaginationInfo;
  nodes: Array<T>
}

export type TGetFlights = {
  launchSite: Pick<SpaceCenter, 'uid' | 'name' | 'id' | 'description'>;
  landingSite: {
    planet: Pick<PlanetModel, 'name'>;
  },
  count: number;
}

export class ApiService {
  private client: ApolloClient<NormalizedCacheObject>;
  private flights: Record<string, TGetFlights & { count: number}> = {};

  constructor() {
    this.client = new ApolloClient({
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache(),
      headers: {
        "Authorization": "Bearer API_KEY"
      }
    });
  }

  sendQuery<T>(query: DocumentNode, variables: OperationVariables = {}): Promise<T> {
    return this.client.query<T>({ query, variables })
      .then(({ data }) => data);
  }

  async getFlightsByUID(departureDay: string, spaceCenterUID: string): Promise<any> {
    const { spaceCenter } = await this.sendQuery<{spaceCenter: SpaceCenter }>(GET_SPACE_CENTER_INFO, { uid: spaceCenterUID });

    return this.getFlights(departureDay, spaceCenter.id);
  }

  async getFlights(departureDay: string, spaceCenterId: string): Promise<CardFlightModel> {
    const { flights: { nodes, pagination } } = await this.sendQuery<{ flights: TList<TGetFlights> }>(
      GET_FLIGHTS,
      {
        departureDay,
        from: spaceCenterId,
        pageSize: 2
      });

    return toCardFlightModel({
      ...nodes[0],
      count: pagination.total * pagination.pageSize
    });
  }
}

export const apiService = new ApiService();
