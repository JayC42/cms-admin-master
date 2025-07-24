import { useEffect, useState } from 'react';
import { GiftTranslationForm } from './edit/GiftTranslationForm.tsx';
import { useGetGiftByIdApi } from '../../../services/gift/getById.gift.ts';
import type { TranslationObject } from '../../../models/TranslationObject.ts';
import { GiftDetailsForm } from './edit/GiftDetailsForm.tsx';
import { GiftRedemptionSetting } from './edit/GiftRedemptionSetting.tsx';
import { useEditGift } from '../../../services/gift/edit.gift.ts';
import { GiftImageUpload } from './imageUpload/Gift.imageUpload.tsx';
import { getLocalizedLabel } from '../../../utils/getLocalizedLabel.ts';
import { Toast } from '../../../utils/Toast.ts';
import type { GiftDetailsSubset } from './edit/types/GiftDetail.type.ts';
import { RedeemConfiguration } from './edit/types/RedeemConfiguration.type.ts';
import { GiftDeliveryOption } from './edit/GiftDeliveryOption.tsx';
import { useCreateGift } from '../../../services/gift/create.gift.ts';
import { AVAILABLE_LOCALES } from '../../common/AvailableLocales.ts';
import { DEFAULT_GIFT_DETAIL } from './edit/types/GiftDetail.type.ts';
import { DEFAULT_REDEEM_CONFIGURATION } from './edit/types/RedeemConfiguration.type.ts';

interface Props {
  giftId?: string;
  onClose: () => void;
}

export const GiftAddOrEdit = ({ giftId = '', onClose }: Props) => {
  const [label, setLabel] = useState<TranslationObject[]>(Object.values(AVAILABLE_LOCALES));
  const [giftDetail, setGiftDetail] = useState<GiftDetailsSubset>(DEFAULT_GIFT_DETAIL);
  const [redeemOption, setRedeemOption] = useState<RedeemConfiguration>(
    DEFAULT_REDEEM_CONFIGURATION,
  );
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0);
  const [memberGiftId, setMemberGiftId] = useState<string | undefined>(undefined);

  const { data } = useGetGiftByIdApi({ pathParams: giftId, options: { enabled: Boolean(giftId) } });
  const { mutateAsync, isSuccess } = useCreateGift();

  useEffect(() => {
    if (!giftId || !data?.success) return;
    setLabel(data.label);
    setGiftDetail(data);
    setRedeemOption({
      ...data,
      timeToPublic: new Date(data.timeToPublic),
      timeToRelease: new Date(data.timeToRelease),
      timeToRemove: new Date(data.timeToRemove),
      redeemCapacity: data.redeemOption.allowedRedeemPerSlot,
      secondReminder: data.redeemOption.winnerSecondReminder,
      minimumAllowedAppointment: data.redeemOption.minimumAllowedAppointment,
      maximumAllowedAppointment: data.redeemOption.maximumAllowedAppointment,
      redeemTimeSlot: data.redeemOption.redeemSession,
    });
    setDeliveryOptions(data.deliveryOption || []);
    setMemberGiftId(giftId);
  }, [data, giftId]);

  const { mutateAsync: mutateAsyncEdit } = useEditGift();

  const formSubmit = async (latestDeliveryOptions?: string[]) => {
    if (step !== 3) return;
    if (!label || !giftDetail || !redeemOption) {
      console.error('One or more required data segments are missing.');
      return;
    }

    const finalDeliveryOptions = latestDeliveryOptions ?? deliveryOptions;

    const createGiftRequest = {
      autoSelectWinner: giftDetail.autoSelectWinner,
      badgeCode: giftDetail.badgeCode,
      label: label,
      maximumAllowedAppointment: redeemOption.maximumAllowedAppointment,
      minimumAllowedAppointment: redeemOption.minimumAllowedAppointment,
      secondReminder: redeemOption.secondReminder,
      market: redeemOption.market,
      poolQuota: giftDetail.poolQuota,
      redeemCapacity: redeemOption.redeemCapacity,
      redeemTimeSlot: redeemOption.redeemTimeSlot,
      tags: giftDetail.tags,
      timeToPublic: redeemOption.timeToPublic,
      timeToRelease: redeemOption.timeToRelease,
      timeToRemove: redeemOption.timeToRemove,
      type: giftDetail.type,
      winnerSelectionTime: giftDetail.winnerSelectionTime,
      deliveryOption: finalDeliveryOptions,
    };

    if (giftId) {
      try {
        await mutateAsyncEdit({ data: createGiftRequest, pathParams: giftId });
      } catch (e) {
        console.error('Failed to edit gift:', e);
        Toast.error('禮品修改失敗');
      }
    } else {
      try {
        const res = await mutateAsync({ data: createGiftRequest });
        if (res.newGiftId) {
          setMemberGiftId(res.newGiftId);
          Toast.success('禮品添加成功');
        } else {
          Toast.error('禮品添加失敗');
        }
      } catch (e) {
        console.error('Failed to create gift:', e);
        Toast.error('禮品添加失敗');
      }
    }
  };

  return (
    <div>
      {step === 0 && label && (
        <GiftTranslationForm
          initialTranslations={label}
          onNext={(translation: TranslationObject[]) => {
            setLabel(translation);
            setStep(1);
          }}
        />
      )}
      {step === 1 && giftDetail && (
        <GiftDetailsForm
          data={giftDetail}
          onPrevious={() => setStep(0)}
          onNext={(data) => {
            setGiftDetail(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && redeemOption && (
        <GiftRedemptionSetting
          id={memberGiftId}
          data={redeemOption}
          onPrevious={() => setStep(1)}
          onNext={(data) => {
            setRedeemOption(data);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <GiftDeliveryOption
          initialOptions={deliveryOptions}
          onPrevious={() => setStep(2)}
          onSubmit={(options) => {
            // Persist the selection in local state for future edits
            setDeliveryOptions(options);
            // Use the freshly-selected options for the API request to avoid relying on async state updates
            formSubmit(options);
          }}
        />
      )}
      {memberGiftId && label && (
        <GiftImageUpload
          open={isSuccess}
          onClose={onClose}
          giftId={memberGiftId}
          giftName={getLocalizedLabel(label).title}
        />
      )}
    </div>
  );
};
