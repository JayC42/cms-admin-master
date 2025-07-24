import React, { useEffect, useState, forwardRef } from 'react';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material';

interface CmsDatePickerProps {
  minDateTime?: Date | undefined;
  label: string;
  value: Date | undefined;
  onChange: (date: Date | null) => void;
  sx?: object;
  error?: boolean;
  helperText?: string;
  disable?: boolean;
}

const CmsDatePicker = forwardRef<HTMLDivElement, CmsDatePickerProps>(
  (
    {
      minDateTime = new Date(),
      label,
      value,
      onChange,
      sx = {},
      error = false,
      helperText = '',
      disable = false,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<Date | null>(value ?? null);

    useEffect(() => {
      setInternalValue(value ?? null);
    }, [value]);

    const handleDateChange = (newDate: Date | null) => {
      setInternalValue(newDate);
      onChange(newDate);
    };
    return (
      <DateTimePicker
        label={label}
        value={internalValue}
        onChange={handleDateChange}
        format="dd-MM-yyyy HH:mm:ss"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        sx={sx}
        minDateTime={minDateTime}
        ref={ref}
        slotProps={{
          textField: {
            error,
            helperText,
          } as TextFieldProps,
        }}
        disabled={disable}
      />
    );
  },
);

export default CmsDatePicker;
