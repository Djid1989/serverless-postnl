import { SQSEvent, SQSHandler } from 'aws-lambda';
import { GpsCoordinatesTable } from '../../libs/clients/gpsCoordinatesTable';
import { DeviceLocation } from '../../libs/types';

const saveLocation: SQSHandler = async (event: SQSEvent) => {

  // TODO: enable processing of multiple records
  const updatedLocation: DeviceLocation = JSON.parse(event.Records[0].body);

  const tableClient = new GpsCoordinatesTable();

  await tableClient.putLocation(updatedLocation);
};

export {
  saveLocation
}
