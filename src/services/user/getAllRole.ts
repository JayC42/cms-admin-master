import { queryCreator } from '../__creator.ts';

type GetAllRoleApi =
  | {
      success: true;
      roleList: {
        id: string;
        allowedModule: string[];
        name: string;
        removable: boolean;
      }[];
    }
  | {
      success: false;
      error: string;
    };

export const useGetAllRoleApi = queryCreator<{ res: GetAllRoleApi }>()('user/getAllRole');
