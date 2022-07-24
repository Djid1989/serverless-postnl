import { SQSEvent, SQSHandler } from 'aws-lambda';
import { GpsCoordinatesTable } from '../../libs/clients/gpsCoordinatesTable';
import { GpsEvent } from '../../libs/types';

const saveLocation: SQSHandler = async (event: SQSEvent) => {

  // TODO: enable processing of multiple records
  const updatedLocation: GpsEvent = JSON.parse(event.Records[0].body);

  const tableClient = new GpsCoordinatesTable();

  await tableClient.putLocation(updatedLocation);
};

export {
  saveLocation
}
