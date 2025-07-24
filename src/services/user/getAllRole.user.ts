import { RoleData } from '../../models/RoleData.ts';
import { mutationCreator } from '../__creator.ts';

type Response = {
  roleList: RoleData[];
  nextRefKey?: string;
};

export const useGetAllRole = mutationCreator<{
  res: Response;
  req: { refKey: string | undefined };
}>('user/getAllRole', 'POST');
