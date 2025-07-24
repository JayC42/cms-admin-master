import { queryCreator } from '../__creator.ts';

interface AdminUserData {
  id: string;
  userName: string;
  userEmail: string;
  role: string;
  roleName: string;
  createdAt: string;
  isActive: boolean;
}

export const useGetUserById = queryCreator<{
  res: {
    adminUser: AdminUserData;
  };
  pathParams: string;
}>()('user/item');
