import { mutationCreator } from '../__creator.ts';

interface ForgotPasswordApi {
  req: {
    email: string;
  };
  res:
    | {
        success: boolean;
        message: string;
        error?: any;
      }
    | {
        success: false;
        error: string;
      };
}

export const useForgotPasswordApi = mutationCreator<{
  res: ForgotPasswordApi['res'];
  req: ForgotPasswordApi['req'];
}>('user/forgotPassword', 'POST', false);
