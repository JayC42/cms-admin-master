import { _queryCreator } from '../_creator.ts';

export interface SettingInfo {
  id: string;
  item: string;
  value: string | number | boolean | string[] | number[] | boolean[];
  type: string;
  description: string;
  regex: string;
  unit: string;
  time: string;
}

export const useGetSettingDetail = _queryCreator<{
  res: { setting: SettingInfo };
  pathParams: string;
}>()('settings/item');
