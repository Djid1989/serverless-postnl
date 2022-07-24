import AWS from 'aws-sdk';
import { GpsLocation } from '../types';

export class GpsCoordinatesTable {

    private dynamoDB: AWS.DynamoDB;

    constructor() {
        this.dynamoDB = new AWS.DynamoDB({
            region: 'eu-west-1',
        })
    }

    public getLocation = async (macAddress: string) => {
        
        let location = await this.dynamoDB.getItem({
            TableName: 'GpsCoordinatesTable',
            Key: {
                'macAddress': { S: macAddress }
            }
        }).promise()

        return location
    }

    public putLocation = async (location: GpsLocation) => {
        return await this.dynamoDB.putItem({
            TableName: 'GpsCoordinatesTable',
            Item: {
                'macAddress': { S: location.macAddress },
                'gpsCoordinate': { S: location.gpsCoordinate }
            }
        }).promise()
    }
}