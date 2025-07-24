import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DEFAULT_GIFT_DETAIL, GiftDetailsSubset } from './types/GiftDetail.type.ts';
import { CreateGiftRequest } from '../../../../services/gift/create.gift.ts';
import { formStyles } from './formStyles.ts';
import { HeaderTitle } from './common/HeaderTitle.tsx';
import { NextStepButton } from './common/NextStepButton.tsx';
import { PreviousStepButton } from './common/PreviousStepButton.tsx';
import { TagsInput } from './detailsForm/TagsInput.tsx';
import { WinnerSelectionRule } from './detailsForm/WinnerSelectionRule.tsx';
import { BasicSettings } from './detailsForm/BasicSetting.tsx';

interface Props {
  data?: GiftDetailsSubset;
  onPrevious: () => void;
  onNext: (data: GiftDetailsSubset) => void;
}

export const GiftDetailsForm: React.FC<Props> = ({
  data = DEFAULT_GIFT_DETAIL,
  onPrevious,
  onNext,
}) => {
  const [gift, setGift] = useState<GiftDetailsSubset>(DEFAULT_GIFT_DETAIL);
  const [errors, setErrors] = useState<{ [key in keyof GiftDetailsSubset]?: string }>({});

  const onSubmit = () => {
    if (validate()) {
      onNext(gift);
    }
  };

  useEffect(() => {
    if (data) setGift(data);
  }, [data]);

  const handleChange = <K extends keyof CreateGiftRequest>(
    field: K,
    value: Date | string | string[] | number | null | boolean,
  ) => {
    setGift({ ...gift, [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    if (field == 'autoSelectWinner' && value === false) {
      setErrors((prevErrors) => ({ ...prevErrors, ['winnerSelectionTime']: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key in keyof GiftDetailsSubset]?: string } = {};

    if (!gift.type || gift.type === 'all') {
      newErrors.type = '請選擇正確的禮品種類。';
    }
    if (!Number.isInteger(gift.poolQuota) || gift.poolQuota <= 0) {
      newErrors.poolQuota = '請填寫正確的P分上限。';
    }
    if (gift.autoSelectWinner && gift.winnerSelectionTime < 0) {
      newErrors.winnerSelectionTime = '如果此禮品自動選擇贏家，贏家挑選時間必須大於0。';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagsChange = (updatedTags: string[]) => {
    setGift({ ...gift, tags: updatedTags });
  };

  return (
    <Box sx={formStyles.wrapperBox}>
      {/* Header Section - Fixed */}
      <Box sx={formStyles.headerBox}>
        <Box sx={formStyles.headerContent}>
          <PreviousStepButton onClick={onPrevious} />
          <HeaderTitle title="添加禮品（二）：禮品展示詳情" />
          <NextStepButton onClick={onSubmit} />
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={formStyles.scrollableWrapper}>
        <Box sx={sxStyles.scrollableContent}>
          {/* Basic Settings */}
          <BasicSettings
            type={gift.type}
            onTypeChange={(name, e) => handleChange(name, e.target.value)}
            typeError={errors.type ?? ''}
            poolQuota={gift.poolQuota}
            onPoolQuotaChange={(e) =>
              handleChange(e.target.name as keyof CreateGiftRequest, parseInt(e.target.value, 10))
            }
            poolQuotaError={errors.poolQuota ?? ''}
          />

          {/* Winner Selection Rules */}
          <WinnerSelectionRule
            isWinnerAutoSelected={gift.autoSelectWinner}
            onAutoSelectionChange={(e) =>
              handleChange(e.target.name as keyof CreateGiftRequest, e.target.checked)
            }
            winnerSelectionTime={gift.winnerSelectionTime}
            onWinnerSelectionChange={(e) =>
              handleChange(e.target.name as keyof CreateGiftRequest, parseInt(e.target.value, 10))
            }
            errorMessage={errors.winnerSelectionTime ?? ''}
          />

          {/* Tags and Badges */}
          <TagsInput
            badgeCode={gift.badgeCode}
            handleChange={(e) => handleChange('badgeCode', e.target.value)}
            tags={gift.tags}
            onTagChange={handleTagsChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

const sxStyles = {
  scrollableContent: {
    display: 'grid',
    gap: '32px',
    pb: 3,
    minHeight: 'calc(100% + 100px)',
  },
};
