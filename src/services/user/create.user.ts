import { mutationCreator } from '../__creator.ts';

interface CreateUserApi {
  req: {
    userName: string;
    userEmail: string;
    roleId: string;
  };
  res:
    | {
        success: true;
        message: string;
        error?: any;
      }
    | {
        success: false;
        error: string;
      };
}

export const useCreateUserApi = mutationCreator<{
  res: CreateUserApi['res'];
  req: CreateUserApi['req'];
}>('user/create', 'POST');
