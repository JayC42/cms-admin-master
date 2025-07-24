import { mutationCreator } from '../__creator.ts';
interface LoginApi {
  req: {
    email: string;
    password: string;
  };
  res:
    | {
        success: true;
        message: string;
        accessToken: string;
        refreshToken: string;
        role: string;
        error?: any;
        session?: string;
      }
    | {
        success: false;
        error: string;
      };
}

export const useLoginApi = mutationCreator<{ res: LoginApi['res']; req: LoginApi['req'] }>(
  'user/login',
  'POST',
  false,
);
