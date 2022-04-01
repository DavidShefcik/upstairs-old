export enum SESSION_DEVICE_TYPE {
  MOBILE,
  DESKTOP,
  UNKNOWN,
}
export interface Session {
  id: string;
  ipAddress: string;
  approximateLocation: string;
  lastLoggedInAt: Date;
  deviceType: SESSION_DEVICE_TYPE;
  isCurrentSession?: boolean;
}
