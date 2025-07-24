import type { RewardType } from '../../components/consts.ts';
import type { TranslationObject } from '../../models/TranslationObject.ts';
import type { ImagePairObject } from '../../models/ImagePairObject.ts';
import { _queryCreator } from '../_creator.ts';

type GetGiftByIdApi =
  | {
      success: true;
      autoSelectWinner: boolean;
      badgeCode: string[];
      createdAt: string;
      id: string;
      image: ImagePairObject[];
      label: TranslationObject[];
      poolQuota: number;
      tags: string[];
      timeToPublic: string;
      timeToRelease: string;
      timeToRemove: string;
      type: RewardType;
      updatedAt: string;
      weightage: number;
      winnerSelectionTime: number;
      market: string;
      deliveryOption: string[];
      redeemOption: {
        allowedRedeemPerSlot: number;
        winnerSecondReminder: number;
        minimumAllowedAppointment: number;
        maximumAllowedAppointment: number;
        redeemSession: string[];
      };
    }
  | {
      success: false;
      error: string;
    };

export const useGetGiftByIdApi = _queryCreator<{ res: GetGiftByIdApi; pathParams: string }>()(
  'gift/item',
);
