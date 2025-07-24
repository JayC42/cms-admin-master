import { mutationCreator } from '../__creator.ts';

type Request = {
  locale: string;
  description: string;
}[];

type Response = {
  status: string;
  code: number;
};

export const useEditNotificationTemplate = mutationCreator<{
  res: Response;
  req: Request;
  pathParams: string;
}>('notification/template', 'PATCH');
