import { _queryCreator } from '../_creator.ts';

export interface SettingData {
  id: string;
  item: string;
  type: string;
  description: string;
}

export const useGetSettingList = _queryCreator<{ res: { items: SettingData[] } }>()(
  'settings/list',
);
