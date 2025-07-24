import { uploadCreator } from '../__creator.ts';

export const useUploadBannerFile = uploadCreator<{
  req: { file?: File; id: string; locale: string };
  res: { result: string };
}>('file/uploadBannerImage');
