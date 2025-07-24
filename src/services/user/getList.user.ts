import { _queryCreator } from '../_creator.ts';

export type AdminUserData = {
  id: string;
  userName: string;
  userEmail: string;
  role: string;
  roleName: string;
  createdAt: string;
  isActive: boolean;
};

type GetUserListResponse = {
  items: AdminUserData[];
  nextRefKey?: string;
};

export const useGetUserList = _queryCreator<{
  res: GetUserListResponse;
  queryParams: {
    refKey: string;
  };
}>()('user/list');
