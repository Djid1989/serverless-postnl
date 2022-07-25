import { GpsCoordinatesTable, HandheldVehicleTable, SnsClient } from '../../libs/clients';
import { distanceInMBetweenEarthCoordinates } from '../../libs/utils';
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DeviceLocation } from '../../libs/types';

const checkHandheldVehicleDistance: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {

  const handheldVehicleTable = new HandheldVehicleTable();
  const gpsCoordinatesTable = new GpsCoordinatesTable();
  const snsClient = new SnsClient();

  const { lat, long, type, macAddress } = DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.NewImage)

  const deviceLocation: DeviceLocation = {
    gpsCoordinate: {
      lat,
      long,
    },
    type,
    macAddress
  }

  // find matching device

  const matchingDevice = await handheldVehicleTable.getHandheldVehicleCombo({
    handheldMacAddress: deviceLocation.type === 'handheld' ? macAddress : undefined,
    vehicleMacAddress: deviceLocation.type === 'vehicle' ? macAddress : undefined,
  })

  // find location of matching device

  const otherDeviceLocation = await gpsCoordinatesTable.getLocation((deviceLocation.type === 'handheld' ?
    matchingDevice.vehicleMacAddress :
    matchingDevice.handheldMacAddress) as string)

  // calculate distance
  
  // TODO: probably this is not the correct calculation (as it is "how the crow flies")
  // it would probably be better to have an implementation of the Google Maps walking route planner
  // to see the actual distance travelled
  const distance = distanceInMBetweenEarthCoordinates(deviceLocation.gpsCoordinate, otherDeviceLocation.gpsCoordinate);

  // send potential notification
  if (distance > 50) {
   await snsClient.publishToIotNotifications({
      deviceLocation,
      otherDeviceLocation
    })
  }
};

export {
  checkHandheldVehicleDistance
}
