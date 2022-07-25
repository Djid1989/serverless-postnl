import { GpsCoordinate } from "@libs/types";

const distanceInMBetweenEarthCoordinates = (gpsCoordinate1: GpsCoordinate, gpsCoordinate2: GpsCoordinate) => {
    const earthRadius = 6371; // Radius of the earth in km
    const noOfMetersInKm = 1000;
    var dLat = degreesToRadians(gpsCoordinate2.lat - gpsCoordinate1.lat);  // degreesToRadians below
    var dLon = degreesToRadians(gpsCoordinate2.long - gpsCoordinate1.long);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(gpsCoordinate1.lat)) * Math.cos(degreesToRadians(gpsCoordinate2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c * noOfMetersInKm; // Distance in m
}

const degreesToRadians = (deg) => deg * (Math.PI / 180)


export {
    distanceInMBetweenEarthCoordinates
}