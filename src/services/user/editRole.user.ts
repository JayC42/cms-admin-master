import { mutationCreator } from '../__creator.ts';

export const useEditRole = mutationCreator<{
  req: { allowedModule: string[] };
  pathParams: string;
}>('user/modifyRole', 'PATCH');
