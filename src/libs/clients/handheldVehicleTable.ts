import { DynamoDB } from 'aws-sdk';

export class HandheldVehicleTable {

    private dynamoDB: DynamoDB;

    constructor() {
        this.dynamoDB = new DynamoDB({
            region: 'eu-west-1',
        })
    }

    public getHandheldVehicleCombo = async ({ handheldMacAddress, vehicleMacAddress }: { handheldMacAddress?: string; vehicleMacAddress?: string; }) => {

        // Jeez, this is ugly. TODO: find a way to query by what is there in dynamodb. 
        // Utility method that adds properties to KeyConditionExpression that are given or st?
        const handheldParams: AWS.DynamoDB.QueryInput = {
            TableName: 'VehicleToHandheldTable',
            KeyConditionExpression: "handheldMacAddress = :handheldMacAddress",
            ExpressionAttributeValues: {
                ':handheldMacAddress': { S: handheldMacAddress },
            },
        }

        const vehiclepParams: AWS.DynamoDB.QueryInput = {
            TableName: 'VehicleToHandheldTable',
            KeyConditionExpression: "vehicleMacAddress = :vehicleMacAddress",
            ExpressionAttributeValues: {
                ':vehicleMacAddress': { S: vehicleMacAddress },
            },
        }

        const handheldVehicleCombo = await this.dynamoDB.query(handheldMacAddress ? handheldParams : vehiclepParams).promise()

        return DynamoDB.Converter.unmarshall(handheldVehicleCombo.Items[0]);
    }
}