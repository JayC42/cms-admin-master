import { RewardType } from '../../components/consts';
import { TranslationObject } from '../../models/TranslationObject';
import { mutationCreator } from '../__creator.ts';

export type CreateGiftRequest = {
  autoSelectWinner: boolean;
  badgeCode: string[];
  label: TranslationObject[];
  maximumAllowedAppointment?: number | undefined;
  minimumAllowedAppointment?: number | undefined;
  secondReminder?: number | undefined;
  market: string;
  poolQuota: number;
  redeemCapacity?: number | undefined;
  redeemTimeSlot?: string[] | undefined;
  tags: string[];
  timeToPublic: Date;
  timeToRelease: Date;
  timeToRemove?: Date | undefined;
  type: RewardType;
  winnerSelectionTime: number;
  deliveryOption: string[];
};

type CreateGiftResponse = {
  newGiftId: string;
};

export const useCreateGift = mutationCreator<{
  req: CreateGiftRequest;
  res: CreateGiftResponse;
}>('gift/create', 'PUT');
