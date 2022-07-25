export interface DeviceLocation extends GpsLocation {
    type: 'vehicle' | 'handheld';
}

export interface GpsCoordinate {
    lat: number;
    long: number;
};

export interface GpsLocation {
    gpsCoordinate: GpsCoordinate;
    macAddress: string;
}
