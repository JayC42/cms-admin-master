import { queryCreator } from '../__creator.ts';

export const useGetAllModule = queryCreator<{
  res: {
    moduleKey: string[];
  };
}>()('user/getAllModuleKey');
