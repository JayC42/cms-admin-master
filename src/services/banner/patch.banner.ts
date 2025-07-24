import type { TranslationObject } from '../../models/TranslationObject.ts';
import { mutationCreator } from '../__creator.ts';

export type CreateBannerRequest = {
  label: TranslationObject[];
  startDate: Date;
  endDate: Date;
  redirectionLink?: string;
};

export type CreateBannerResponse = {
  newBanner: string;
};

export const usePatchBanner = mutationCreator<{
  res: CreateBannerResponse;
  req: CreateBannerRequest;
  pathParams: string;
}>('banner/item', 'PATCH');
