import { checkHandheldVehicleDistance } from "../handler";

const putLocation = jest.fn()
const publishToIotNotifications = jest.fn()
const getHandheldVehicleCombo = jest.fn().mockReturnValue({
    handheldMacAddress: '123',
    vehicleMacAddress: '234'
})
const getLocation = jest.fn().mockReturnValue({
    gpsCoordinate: {
        lat: 0,
        long: 0,
      },
})

jest.mock('../../../libs/clients/gpsCoordinatesTable.ts', () => {
    return {
        GpsCoordinatesTable: jest.fn().mockImplementation(() => {
            return {
                getLocation,
                putLocation
            }
        })
    }
});

jest.mock('../../../libs/clients/handheldVehicleTable.ts', () => {
    return {
        HandheldVehicleTable: jest.fn().mockImplementation(() => {
            return {
                getHandheldVehicleCombo
            }
        })
    }
});

jest.mock('../../../libs/clients/snsClient.ts', () => {
    return {
        SnsClient: jest.fn().mockImplementation(() => {
            return {
                publishToIotNotifications
            }
        })
    }
});

describe('checks the location', () => {
    it('processes the event', async () => {

        await checkHandheldVehicleDistance({
            Records: [{
                dynamodb: {
                    NewImage: { 
                        lat: { N: "1" }, 
                        long: { N: "0" }, 
                        type: { S: 'vehicle' }, 
                        macAddress: { S: '' } }
                }
            }]
        }, undefined, undefined);

        expect(getHandheldVehicleCombo).toHaveBeenCalled()

        expect(publishToIotNotifications).toHaveBeenCalled()
    })
})