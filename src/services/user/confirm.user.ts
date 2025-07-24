import { mutationCreator } from '../__creator.ts';
interface ConfirmUserApi {
  req: {
    session: string;
    email: string;
    newPassword: string;
  };
  res:
    | {
        success: true;
        message: string;
      }
    | {
        success: false;
        error: string;
      };
}

export const useConfirmUserApi = mutationCreator<{
  res: ConfirmUserApi['res'];
  req: ConfirmUserApi['req'];
}>('user/confirmUser', 'POST');

// () => {
//   return useMutation({
//     mutationFn: asyncPost(`${getApiEndpoint()}user/confirmUser`)<ConfirmUserApi>,
//   });
// };
