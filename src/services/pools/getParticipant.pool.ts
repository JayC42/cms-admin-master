import { _queryCreator } from '../_creator';

export type PoolParticipant = {
  id: string;
  gameUserId: string;
  gameUserData: GameUserDataObject;
  poolId: string;
  round: number;
  type: string;
  totalPfundDeposited: number;
  announcementTime?: Date;
  winningStatus: string;
};

type GameUserDataObject = {
  userName: string;
  email: string;
};

type GetPoolParticipantResponse = {
  items: PoolParticipant[];
  nextRefKey?: string;
};

export const useGetPoolParticipant = _queryCreator<{
  res: GetPoolParticipantResponse;
  pathParams: string;
}>()('pool/players');
