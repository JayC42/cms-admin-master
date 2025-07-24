import { mutationCreator } from '../__creator.ts';
interface UpdateFeatureItemListApi {
  req: UpdatedWeightageItem[];
  res:
    | {
        success: true;
      }
    | {
        success: false;
        error: string;
      };
}

type UpdatedWeightageItem = {
  id: string;
  weightage: number;
};

export const useUpdateFeatureItemListApi = mutationCreator<{
  res: UpdateFeatureItemListApi['res'];
  req: UpdateFeatureItemListApi['req'];
}>('gift/update-feature', 'POST');
