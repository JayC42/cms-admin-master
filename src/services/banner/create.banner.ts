import { mutationCreator } from '../__creator.ts';

export type CreateBannerRequest = {
  label: { locale: string; title: string; description: string; image?: File | undefined }[];
  startDate: Date;
  endDate: Date;
  redirectionLink?: string;
};

export type CreateBannerResponse = {
  newBanner: string;
};

export const useCreateBanner = mutationCreator<{
  res: CreateBannerResponse;
  req: CreateBannerRequest;
}>('banner/create', 'POST');
