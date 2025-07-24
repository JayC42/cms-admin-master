export type RedeemConfiguration = {
  market: string;
  timeToPublic: Date;
  timeToRelease: Date;
  timeToRemove?: Date | undefined;
  redeemTimeSlot?: string[] | undefined;
  redeemCapacity?: number | undefined;
  secondReminder?: number | undefined;
  minimumAllowedAppointment?: number | undefined;
  maximumAllowedAppointment?: number | undefined;
};

export const DEFAULT_REDEEM_CONFIGURATION = {
  market: 'Malaysia',
  timeToPublic: new Date(),
  timeToRelease: new Date(),
  timeToRemove: undefined,
  redeemTimeSlot: undefined,
  redeemCapacity: undefined,
  secondReminder: undefined,
  minimumAllowedAppointment: undefined,
  maximumAllowedAppointment: undefined,
};
