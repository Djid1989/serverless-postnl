export interface GpsEvent extends GpsLocation {
    type: 'vehicle' | 'handheld';
}

export interface GpsLocation {
    gpsCoordinate: string;
    macAddress: string;
}
