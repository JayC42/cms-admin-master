import { mutationCreator } from '../__creator.ts';

export type AssignUserRequest = {
  userId: string;
  newRoleId: string;
};

export const useAssignRole = mutationCreator<{ req: AssignUserRequest }>('user/assignRole', 'POST');
