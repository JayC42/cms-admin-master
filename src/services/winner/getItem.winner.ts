import type { TranslationObject } from '../../models/TranslationObject.ts';
import { _queryCreator } from '../_creator.ts';

export type WinnerDetail = {
  id: string;
  timeToAnnouncement: string;
  handledBy: string;
  giftId: string;
  poolId: string;
  label: TranslationObject[];
  giftType: string;
  gameUserData: {
    userName: string;
    email: string;
    phoneNo: string;
    identityNo: string;
    fullName: string;
  };
  winnerStatus: string;
  scoreQuotaRatio: number;
  redeemOption: {
    allowedRedeemPerSlot: number | string;
    winnerSecondReminder: number | string;
    minimumAllowedAppointment: number | string;
    maximumAllowedAppointment: number | string;
    redeemSession: string[];
  };
  lastUpdated: string;
};

export type AppointmentInfo = {
  dateForCollection: string;
  sessionForCollection: string;
};

export type GetWinnerItemResponse = {
  winner: WinnerDetail;
  stock: number;
  appointmentInfo: AppointmentInfo[];
};

export const useGetWinnerItem = _queryCreator<{ res: GetWinnerItemResponse; pathParams: string }>()(
  'winner/item',
);
