import React from 'react';
import { Box, Button, Typography, FormControl } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeliveryOptionPaper from './deliveryOption/DeliveryOptionPaper';
import { formStyles } from './formStyles.ts';
import { HeaderTitle } from './common/HeaderTitle.tsx';
import { PreviousStepButton } from './common/PreviousStepButton.tsx';

interface Props {
  onPrevious: () => void;
  onSubmit: (options: string[]) => void;
  initialOptions?: string[];
}

export const GiftDeliveryOption: React.FC<Props> = ({
  onPrevious,
  onSubmit,
  initialOptions = [],
}) => {
  const [deliveryOptions, setDeliveryOptions] = React.useState<string[]>(initialOptions);

  const handleOptionToggle = (option: string) => {
    setDeliveryOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      }
      return [...prev, option];
    });
  };

  const handleSubmit = () => {
    if (deliveryOptions.length > 0) {
      onSubmit(deliveryOptions);
    }
  };

  return (
    <Box sx={formStyles.wrapperBox}>
      {/* Header Section */}
      <Box sx={formStyles.headerBox}>
        <Box sx={formStyles.headerContent}>
          <PreviousStepButton onClick={onPrevious} />
          <HeaderTitle title="添加禮品（四）：配送方式" />
          <Button
            variant="contained"
            onClick={handleSubmit}
            endIcon={<CheckIcon />}
            disabled={deliveryOptions.length === 0}
          >
            完成
          </Button>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={formStyles.scrollableWrapper}>
        <Box sx={sxStyles.scrollableContent}>
          <Typography variant="subtitle1" sx={sxStyles.optionTooltip}>
            選擇配送方式（可多選）
          </Typography>

          <FormControl component="fieldset">
            <Box sx={{ display: 'grid', gap: '12px' }}>
              {DELIVERY_OPTIONS.map((option) => (
                <DeliveryOptionPaper
                  deliveryOptions={deliveryOptions}
                  onOptionToggle={handleOptionToggle}
                  option={option}
                />
              ))}
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

const sxStyles = {
  scrollableContent: {
    display: 'grid',
    gap: '16px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  optionTooltip: { mb: 2, fontWeight: 500 },
};

const DELIVERY_OPTIONS = [
  {
    value: 'delivery',
    label: '快遞配送',
    description: '通過快遞服務將禮品配送到指定地址',
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    value: 'pickup',
    label: '自取點提貨',
    description: '用戶可在指定自取點領取禮品',
    icon: <StorefrontOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    value: 'email',
    label: '電子郵件發送',
    description: '適用於電子禮品卡等虛擬商品',
    icon: <EmailOutlinedIcon sx={{ fontSize: 32 }} />,
  },
];
