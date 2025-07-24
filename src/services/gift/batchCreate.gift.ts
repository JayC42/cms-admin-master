import type { TranslationObject } from '../../models/TranslationObject.ts';
import { mutationCreator } from '../__creator.ts';

type BatchCreateObject = {
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

export type BatchCreateRequest = {
  gifts: BatchCreateObject[];
};

type CreatedGiftItem = {
  newGiftId: string;
  title: string;
};

export type BatchCreateResponse = {
  createdGifts: CreatedGiftItem[];
};

export const usePutBatchCreate = mutationCreator<{
  req: BatchCreateObject[];
  res: BatchCreateResponse;
}>('gift/batch-create', 'PUT');
