import { _mutateCreator } from '../_creator.ts';

export type PickedWinner = {
  userName: string;
  id: string;
  email: string;
};

export const usePickWinner = _mutateCreator<
  NonNullable<unknown>,
  { output: PickedWinner; success: boolean },
  string
>()('pool/select-winner', 'POST');
