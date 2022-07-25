import { saveLocation } from "../handler";

// import { GpsCoordinatesTable } from "../../../libs/clients"; 

const putLocation = jest.fn()

jest.mock('../../../libs/clients/gpsCoordinatesTable.ts', () => {
    return {
        GpsCoordinatesTable: jest.fn().mockImplementation(() => {
            return {
                getLocation: jest.fn(),
                putLocation
            }
        })
    }
});

describe('save location', () => {
    it('saves the location to dynamodb', async () => {

        saveLocation({
            //@ts-ignore
            Records: [{
                messageId: '',
                body: JSON.stringify({
                    location: {
                        lat: 0,
                        long: 0
                    }
                })
            }]
        }, undefined, undefined);

        expect(putLocation).toHaveBeenCalledWith({
            location: {
                lat: 0,
                long: 0
            }
        })
    })
})