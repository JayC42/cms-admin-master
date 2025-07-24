import { mutationCreator } from '../__creator.ts';

export const useRedeemWinner = mutationCreator<{ req: { poolWinnerId: string } }>(
  'winner/redeem',
  'POST',
);
