import { RewardType } from '../../components/consts';
import { _queryCreator } from '../_creator.ts';

type GetExportApi =
  | {
      success: true;
      items: ExportListItem[];
      nextRefKey?: string;
    }
  | {
      success: false;
      error: string;
    };

type Params = {
  type: RewardType;
  startDate: string;
  endDate: string;
};

export type ExportListItem = {
  id: string;
  title: string;
  subTitle: string;
  poolQuota: number;
  type: RewardType;
  timeToPublic: string;
  timeToRelease: string;
  timeToRemove: string;
  autoSelectWinner: boolean;
  winnerSelectionTime: number;
};

export const useGetExportApi = _queryCreator<{ res: GetExportApi; queryParams: Params }>()(
  'gift/export',
);
