import { mutationCreator } from '../__creator.ts';

export const useUpdateSetting = mutationCreator<{
  req: { value: string | number | boolean | (string | number | boolean)[] };
  pathParams: string;
}>('/settings/update', 'POST');
