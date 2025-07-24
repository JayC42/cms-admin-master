import { uploadCreator } from '../__creator.ts';

export const useUploadOfflineGiftImage = uploadCreator<{
  req: { file?: File; giftId: string };
  res: { result: string };
}>('file/uploadOfflineGiftImage');
