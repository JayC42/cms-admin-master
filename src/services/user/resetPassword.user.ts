import { mutationCreator } from '../__creator.ts';

interface ResetPasswordApi {
  req: {
    email: string;
    newPassword: string;
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

export const useResetPasswordApi = mutationCreator<{
  res: ResetPasswordApi['res'];
  req: ResetPasswordApi['req'];
}>('user/resetPassword', 'POST', false);
