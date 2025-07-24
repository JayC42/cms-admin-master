import { uploadCreator } from '../__creator.ts';

export const useUploadImage = uploadCreator<{ req: FormData; pathParams: string }>(
  'gift/uploadImage',
);
