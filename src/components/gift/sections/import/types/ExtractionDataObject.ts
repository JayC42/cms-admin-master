import { TranslationObject } from '../../../../../models/TranslationObject.ts';

export type ExtractionDataObject = {
  id: string;
  label: TranslationObject[];
  poolQuota: number;
  timeToPublic: Date;
  timeToRelease: Date;
  timeToRemove?: Date;
  type: string;
  autoSelectWinner: boolean;
  winnerSelectionTime: number;
  badgeCode: string[];
  tags: string[];
  redeemCapacity?: number;
  maximumAllowedAppointment?: number;
  minimumAllowedAppointment?: number;
  secondReminder?: number;
  redeemTimeSlot?: string[];
  market: string;
  deliveryOption: string[];
};
