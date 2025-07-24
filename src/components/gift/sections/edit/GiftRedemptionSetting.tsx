import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { RedeemConfiguration } from './types/RedeemConfiguration.type.ts';
import { CreateGiftRequest } from '../../../../services/gift/create.gift.ts';
import { formStyles } from './formStyles.ts';
import { HeaderTitle } from './common/HeaderTitle.tsx';
import { NextStepButton } from './common/NextStepButton.tsx';
import { PreviousStepButton } from './common/PreviousStepButton.tsx';
import { MarketAndTimeSlots } from './redemption/MarketAndTimeSlots.tsx';
import { RedemptionRules } from './redemption/RedemptionRules.tsx';
import { TimelineSettings } from './redemption/TimelineSettings.tsx';

const defaultConfiguration: RedeemConfiguration = {
  market: 'Malaysia',
  timeToPublic: new Date(),
  timeToRelease: new Date(),
  timeToRemove: undefined,
  redeemTimeSlot: undefined,
  redeemCapacity: undefined,
  secondReminder: undefined,
  minimumAllowedAppointment: undefined,
  maximumAllowedAppointment: undefined,
};

interface Props {
  id: string | undefined;
  data?: RedeemConfiguration;
  onPrevious: () => void;
  onNext: (data: RedeemConfiguration) => void;
}

export const GiftRedemptionSetting: React.FC<Props> = ({
  id,
  data = defaultConfiguration,
  onPrevious,
  onNext,
}) => {
  const [gift, setGift] = useState<RedeemConfiguration>(data);
  const giftRef = useRef<RedeemConfiguration>(gift);

  const [errors, setErrors] = useState<{
    timeToPublic?: string;
    timeToRelease?: string;
    timeToRemove?: string;
    redeemCapacity?: string;
    secondReminder?: string;
    minimumAllowedAppointment?: string;
    maximumAllowedAppointment?: string;
  }>({});
  const [editingValues, setEditingValues] = useState<string[]>(gift.redeemTimeSlot || []);

  const [isEditMode] = useState<boolean>(!!id);
  const [fieldsDisabled, setFieldsDisabled] = useState<{
    timeToPublic: boolean;
    timeToRelease: boolean;
  }>({
    timeToPublic: false,
    timeToRelease: false,
  });

  useEffect(() => {
    if (!id || !data) {
      return;
    }
    const currentTime = new Date();
    if (data.timeToPublic < currentTime && data.timeToRelease >= currentTime) {
      setFieldsDisabled({ timeToPublic: true, timeToRelease: false });
    } else if (data.timeToPublic < currentTime && data.timeToRelease < currentTime) {
      setFieldsDisabled({ timeToPublic: true, timeToRelease: true });
    }
  }, [data.timeToPublic, data.timeToRelease]);

  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};
    const minDate = new Date();
    if (!isEditMode) {
      if (gift.timeToPublic && gift.timeToPublic < minDate) {
        newErrors.timeToPublic = '公開時間必須為明天之後的日期。';
      }
      if (gift.timeToRelease && gift.timeToRelease < minDate) {
        newErrors.timeToRelease = '發佈時間必須為明天之後的日期。';
      }
      if (gift.timeToRelease && gift.timeToPublic && gift.timeToRelease < gift.timeToPublic) {
        newErrors.timeToRelease = '發佈時間必須在公開時間之後。';
      }
    }
    if (gift.timeToRemove && gift.timeToRemove < minDate) {
      newErrors.timeToRemove = '移除時間必須為明天之後的日期。';
    }
    if (gift.timeToRemove && gift.timeToRelease && gift.timeToRemove <= gift.timeToRelease) {
      newErrors.timeToRemove = '移除時間必須在發佈時間之後。';
    }
    if (
      gift.redeemCapacity !== undefined &&
      gift.redeemCapacity !== null &&
      gift.redeemCapacity <= 0
    ) {
      newErrors.redeemCapacity = '领奖人数上限必須大於 0。';
    }

    const { secondReminder, minimumAllowedAppointment, maximumAllowedAppointment } = gift;

    if (
      secondReminder !== undefined ||
      minimumAllowedAppointment !== undefined ||
      maximumAllowedAppointment !== undefined
    ) {
      // Ensure all three fields are defined
      if (
        secondReminder === undefined ||
        minimumAllowedAppointment === undefined ||
        maximumAllowedAppointment === undefined
      ) {
        if (secondReminder === undefined) {
          newErrors.secondReminder = '所有提醒和預約限制必須一同定義。';
        }
        if (minimumAllowedAppointment === undefined) {
          newErrors.minimumAllowedAppointment = '所有提醒和預約限制必須一同定義。';
        }
        if (maximumAllowedAppointment === undefined) {
          newErrors.maximumAllowedAppointment = '所有提醒和預約限制必須一同定義。';
        }
      } else {
        // 3. Validate ordering if all three values are set
        if (secondReminder >= maximumAllowedAppointment) {
          newErrors.secondReminder = '第二次提醒應設定在最遲可預約天數之前。';
        }
        if (minimumAllowedAppointment >= maximumAllowedAppointment) {
          newErrors.minimumAllowedAppointment = '最早可預約天數應小於最遲可預約天數。';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateInputs()) {
      handleChange('redeemTimeSlot', editingValues);
      onNext({ ...giftRef.current });
    }
  };

  useEffect(() => {
    if (!data) return;
    setGift(data);
  }, []);

  const handleChange = <K extends keyof RedeemConfiguration>(
    field: K,
    value: Date | string | string[] | number | null | boolean,
  ) => {
    const updatedGift = { ...giftRef.current, [field]: value };
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
      updatedGift[field] = undefined as RedeemConfiguration[K];
    } else {
      updatedGift[field] = value as RedeemConfiguration[K]; // Otherwise, set the value
    }
    giftRef.current = updatedGift;
    setGift(updatedGift);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
  };

  const handleFocus = <K extends keyof CreateGiftRequest>(field: K) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
  };

  return (
    <Box sx={formStyles.wrapperBox}>
      {/* Header Section */}
      <Box sx={formStyles.headerBox}>
        <Box sx={formStyles.headerContent}>
          <PreviousStepButton onClick={() => onPrevious()} />
          <HeaderTitle title="添加禮品（三）：獎池參與與兌換詳情" />
          <NextStepButton onClick={onSubmit} />
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={formStyles.scrollableWrapper}>
        <Box
          sx={{
            display: 'grid',
            gap: '32px',
            pb: 3,
            minHeight: 'calc(100% + 100px)',
          }}
        >
          {/* Timeline Settings */}
          <TimelineSettings
            redeemConfiguration={gift}
            onFieldChange={handleChange}
            disableTimeToPublic={fieldsDisabled.timeToPublic}
            disableTimeToRelease={fieldsDisabled.timeToRelease}
            errors={errors}
          />

          {/* Redemption Rules */}
          <RedemptionRules
            redeemConfiguration={gift}
            redeemCapacityError={errors.redeemCapacity ?? ''}
            minimumAllowedAppointmentError={errors.minimumAllowedAppointment ?? ''}
            maximumAllowedAppointmentError={errors.maximumAllowedAppointment ?? ''}
            secondReminderError={errors.secondReminder ?? ''}
            onFieldChange={(name, val) => handleChange(name, val)}
            onFocus={handleFocus}
          />

          {/* Market and Time Slots */}
          <MarketAndTimeSlots
            market={gift.market}
            onMarketChange={(name, e) => handleChange(name, e.target.value)}
            editingValues={editingValues}
            setEditingValues={setEditingValues}
          />
        </Box>
      </Box>
    </Box>
  );
};
