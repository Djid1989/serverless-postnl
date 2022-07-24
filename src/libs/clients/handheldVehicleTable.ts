import AWS from 'aws-sdk';

export class HandheldVehicleTable {

    private dynamoDB: AWS.DynamoDB;

    constructor() {
        this.dynamoDB = new AWS.DynamoDB({
            region: 'eu-west-1',
        })
    }

    public getHandheldVehicleCombo = async ({handheldMacAddress, vehicleMacAddress}: { handheldMacAddress?: string; vehicleMacAddress?: string;}) => {
        
        const handheldVehicleCombo = await this.dynamoDB.getItem({
            TableName: 'VehicleToHandheldTable',
            Key: {
                ...(handheldMacAddress ? {'handheldMacAddress': { S: handheldMacAddress }}: {}),
                ...(vehicleMacAddress ? {'vehicleMacAddress': { S: vehicleMacAddress }}: {}),
            }
        }).promise()

        return handheldVehicleCombo
    }
}