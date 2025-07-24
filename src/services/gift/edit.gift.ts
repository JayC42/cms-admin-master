import { RewardType } from '../../components/consts.ts';
import { TranslationObject } from '../../models/TranslationObject.ts';
import { mutationCreator } from '../__creator.ts';

type EditGiftRequest = {
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
};

type EditGiftResponse = {
  status: string;
  code: number;
};

export const useEditGift = mutationCreator<{
  res: EditGiftResponse;
  req: EditGiftRequest;
  pathParams: string;
}>('gift/item', 'PATCH');
