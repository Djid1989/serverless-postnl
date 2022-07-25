import { DynamoDB } from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { DeviceLocation } from '../types';

export class GpsCoordinatesTable {

    private dynamoDB: DynamoDB;

    constructor() {
        this.dynamoDB = new DynamoDB({
            region: 'eu-west-1',
        })
    }

    public getLocation = async (macAddress: string): Promise<DeviceLocation> => {

        let data = await this.dynamoDB.getItem({
            TableName: 'GpsCoordinatesTable',
            Key: {
                'macAddress': { S: macAddress }
            }
        }).promise()

        const item = DynamoDB.Converter.unmarshall(data.Item);

        return {
            gpsCoordinate: {
                lat: item?.lat as number || 0,
                long: item?.long as number || 0,
            },
            type: item?.type as 'vehicle' | 'handheld',
            macAddress: item?.macAddress as string || ''
        }
    }

    public putLocation = async (location: DeviceLocation) => {
        return await this.dynamoDB.putItem({
            TableName: 'GpsCoordinatesTable',
            Item: {
                'macAddress': { S: location.macAddress },
                'type': { S: location.type },
                'lat': { N: location.gpsCoordinate.lat.toString() },
                'long': { N: location.gpsCoordinate.long.toString() }
            }
        } as PutItemInput).promise()
    }
}