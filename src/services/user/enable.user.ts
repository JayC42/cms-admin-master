import { mutationCreator } from '../__creator.ts';

export const useEnableUser = mutationCreator<{ req: { userId: string } }>('user/enable', 'POST');
