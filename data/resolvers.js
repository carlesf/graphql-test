// import { Author, FortuneCookie} from './connectors';
import request from 'request';

const bicingBaseUrl = 'http://wservice.viabicing.cat/v2/stations';

function filterInt(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}

function parseBicingStation(data) {
  const id = filterInt(data.id);
  const type = data.type;
  const streetName = data.streetName;
  const streetNumber = data.streetNumber;
  const altitude = data.altitude;
  const slots = data.slots;
  const bikes = data.bikes;
  const status = data.status;
  const _nearbyStationIds = data.nearbyStations.split(", ").map(filterInt);
  const _coords = [data.latitude, data.longitude]
  return ({
    		id,
        type,
        streetName,
        streetNumber,
        altitude,
        slots,
        bikes,
        status,
        _nearbyStationIds,
    		_coords
      });
}

function getBicingStations() {
  return new Promise((resolve, reject) => {
    request(bicingBaseUrl, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const output = JSON.parse(body).stations.map(parseBicingStation)
      resolve(output);
    });
  });
}

function getBicingStation(id) {
  return new Promise((resolve, reject) => {
    request(`${bicingBaseUrl}/${id}`, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const output = parseBicingStation(JSON.parse(body).stations[0]);
      resolve(output);
    });
  });
}

const resolvers = {
  Query: {
    getAllBicingStations: (_) => getBicingStations(),
    getBicingStationById: (_, args) => getBicingStation(args.id)
  },
  
  BicingStation: {
    nearbyStations: (root) => root._nearbyStationIds.map(getBicingStation),
    coordinate: (root) => ({latitude: root._coords[0], longitude: root._coords[1]})
  }
};

export default resolvers;