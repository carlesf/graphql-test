const typeDefinitions = `
type GeographicalCoordinate {
		latitude: String!
		longitude: String!
	}

  type BicingStation {
		coordinate: GeographicalCoordinate!
		id: Int!
		type: String!
		streetName: String!
		streetNumber: Int!
		altitude: Int!
		slots: Int!
		bikes: Int!
		status:String!
		nearbyStations: [BicingStation]
	}

type Query {
		getAllBicingStations: [BicingStation]
    getBicingStationById (id: Int!): BicingStation
  }
`;

export default [typeDefinitions];