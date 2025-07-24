import { mutationCreator } from '../__creator.ts';

export const useDisableUser = mutationCreator<{ req: { userId: string } }>('user/disable', 'POST');
