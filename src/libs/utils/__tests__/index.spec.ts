import { distanceInMBetweenEarthCoordinates } from ".."

describe('haversine algoritm', () => {
    it('measures as the crow flies', async () => {

        const lessThan50 = distanceInMBetweenEarthCoordinates({
            lat: 54.2026758, long: -4.5204577
        }, {
            lat: 54.2027097, long: -4.5200694
        })

        expect(lessThan50).toBe(25.53482997363062)


    })

    it('measures larger distance', async () => {

        const moreThan50 = distanceInMBetweenEarthCoordinates({
            lat: 54.2026758, long: -4.5204577
        }, {
            lat: 54.2026996, long: -4.5172284
        })

        expect(moreThan50).toBe(210.05065114735982)


    })
})