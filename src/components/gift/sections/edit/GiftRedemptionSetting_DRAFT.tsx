import React, { useEffect, useState } from 'react';
import { getMinimumDate } from '../../../../utils/getMinimumDate.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CmsDateTimePicker from '../../../common/CmsDateTimePicker.tsx';
import { input2, input2end } from '../../formStyles.ts';
import { Button, List, ListItem, TextField } from '@mui/material';
import { DeleteButton } from '../../../common';
import AddIcon from '@mui/icons-material/Add';
import { MARKET_LIST } from '../../../consts.ts';
import Dropdown from '../../../common/Dropdown.tsx';
import Tooltip from '@mui/material/Tooltip';
import { Controller, useForm } from 'react-hook-form';
import { CreateGiftRequest } from '../../../../services/gift/create.gift.ts';

interface GiftConfiguration {
  market: string;
  timeToPublic: Date;
  timeToRelease: Date;
  timeToRemove?: Date | undefined;
  redeemTimeSlot?: string[] | undefined;
  redeemCapacity?: number | undefined;
  secondReminder?: number | undefined;
  minimumAllowedAppointment?: number | undefined;
  maximumAllowedAppointment?: number | undefined;
}

const defaultConfiguration: GiftConfiguration = {
  market: 'Malaysia',
  timeToPublic: getMinimumDate(),
  timeToRelease: getMinimumDate(),
  timeToRemove: undefined,
  redeemTimeSlot: undefined,
  redeemCapacity: undefined,
  secondReminder: undefined,
  minimumAllowedAppointment: undefined,
  maximumAllowedAppointment: undefined,
};

interface Props {
  id?: string;
  data?: GiftConfiguration;
  onPrevious: () => void;
  onNext: (data: GiftConfiguration) => void;
}

export const GiftRedemptionSetting: React.FC<Props> = ({
  id = undefined,
  data = defaultConfiguration,
  onPrevious,
  onNext,
}) => {
  const [gift, setGift] = useState<GiftConfiguration>(defaultConfiguration);
  const [editingValues, setEditingValues] = useState<string[]>([]);
  const {
    register,
    control,
    setError,
    formState: { errors },
  } = useForm<GiftConfiguration>();

  const [fieldsDisabled, setFieldsDisabled] = useState({
    timeToPublic: false,
    timeToRelease: false,
  });

  useEffect(() => {
    if (id && data) {
      setGift(data);
      const currentTime = new Date();
      setFieldsDisabled({
        timeToPublic: data.timeToPublic < currentTime,
        timeToRelease: data.timeToRelease < currentTime,
      });
    }
  }, [data, id]);

  const handleAddItem = () => {
    setEditingValues([...editingValues, '']);
  };

  const handleDeleteItem = (index: number) => {
    setEditingValues(editingValues.filter((_, i) => i !== index));
  };

  const handleChangeItem = (index: number, value: string) => {
    setEditingValues(editingValues.map((v, i) => (i === index ? value : v)));
  };

  const onSubmit = () => {
    if (validateInputs()) {
      onNext({ ...gift, redeemTimeSlot: editingValues });
      console.log('validation passed');
    } else {
      console.log('validation failed');
    }
  };

  const validateInputs = (): boolean => {
    const minDate = getMinimumDate();
    const { timeToPublic, timeToRelease, timeToRemove, redeemCapacity } = gift;
    console.log('gift', gift);

    if (timeToPublic && timeToPublic < minDate)
      setError('timeToPublic', { message: '公開時間必須為明天之後的日期。' });
    if (timeToRelease && timeToRelease < minDate)
      setError('timeToRelease', { message: '發佈時間必須為明天之後的日期。' });
    if (timeToRelease && timeToPublic && timeToRelease < timeToPublic)
      setError('timeToRelease', { message: '發佈時間必須在公開時間之後。' });
    if (timeToRemove && timeToRemove < minDate)
      setError('timeToRemove', { message: '移除時間必須為明天之後的日期。' });
    if (redeemCapacity !== undefined && redeemCapacity <= 0)
      setError('redeemCapacity', { message: '领奖人数上限必須大於 0。' });

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (!data) return;
    setGift(data);
  }, []);

  return (
    <div>
      <div>
        <Button onClick={onPrevious}>上一步</Button>
        添加禮品（三）：獎池參與與兌換詳情
        <Button onClick={onSubmit}>{id ? '修改' : '提交'}</Button>
      </div>
      <div style={{ width: '100%', height: '16px' }}></div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ maxHeight: '70vh', ...input2 }}>
          <div>禮品參與设置</div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="timeToPublic"
              control={control}
              rules={{
                validate: (date) => date >= getMinimumDate() || '公開時間必須為明天之後的日期。',
              }}
              render={({ field }) => (
                <CmsDateTimePicker
                  {...field}
                  label="公開時間"
                  onChange={(date) => field.onChange(date)}
                  sx={{ marginTop: '16px', width: '100%' }}
                  minDateTime={getMinimumDate()}
                  error={!!errors.timeToPublic}
                  helperText={errors.timeToPublic?.message ?? ''}
                  disable={fieldsDisabled.timeToPublic}
                  value={gift.timeToPublic}
                />
              )}
            />

            <Controller
              name="timeToRelease"
              control={control}
              rules={{
                validate: (date) => date >= getMinimumDate() || '發佈時間必須為明天之後的日期。',
              }}
              render={({ field }) => (
                <CmsDateTimePicker
                  {...field}
                  label="參與時間"
                  onChange={(date) => field.onChange(date)}
                  sx={{ marginTop: '16px', width: '100%' }}
                  minDateTime={getMinimumDate()}
                  error={!!errors.timeToRelease}
                  helperText={errors.timeToRelease?.message ?? ''}
                  disable={fieldsDisabled.timeToRelease}
                  value={gift.timeToRelease}
                />
              )}
            />

            <Tooltip title="Leave empty if no expiration date is desired.">
              <Controller
                name="timeToRemove"
                control={control}
                rules={{
                  validate: (date) => {
                    if (!date) return true;
                    return date >= getMinimumDate() || '移除時間必須為明天之後的日期。';
                  },
                }}
                render={({ field }) => (
                  <CmsDateTimePicker
                    {...field}
                    label="移除時間"
                    onChange={(date) => field.onChange(date)}
                    sx={{ marginTop: '16px', width: '100%' }}
                    minDateTime={getMinimumDate()}
                    error={!!errors.timeToRemove}
                    helperText={errors.timeToRemove?.message ?? ''}
                    value={gift.timeToRemove}
                  />
                )}
              />
            </Tooltip>
          </LocalizationProvider>
          <TextField
            label="領獎人數上限"
            type="number"
            {...register('redeemCapacity', {
              required: '領獎人數上限是必填項目。',
              min: { value: 1, message: '領獎人數上限必須大於 0。' },
            })}
            fullWidth
            sx={{ marginTop: '16px', ...input2end, width: '100%' }}
            error={!!errors.redeemCapacity}
            helperText={errors.redeemCapacity?.message}
            value={gift.redeemCapacity}
          />
          <Controller
            name="secondReminder"
            control={control}
            rules={{
              required: '二次提醒期限是必填項目。',
              min: { value: 1, message: '二次提醒期限必須大於 0。' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="二次提醒期限（天）"
                type="number"
                fullWidth
                sx={{ marginTop: '16px', ...input2end, width: '100%' }}
                error={!!errors.secondReminder}
                helperText={errors.secondReminder?.message}
                value={gift.secondReminder}
              />
            )}
          />

          <Controller
            name="minimumAllowedAppointment"
            control={control}
            rules={{
              required: '最早可預約時間是必填項目。',
              min: { value: 1, message: '最早可預約時間必須大於 0。' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="贏家獲獎後最早可預約時間（天）"
                type="number"
                fullWidth
                sx={{ marginTop: '16px', ...input2end, width: '100%' }}
                error={!!errors.minimumAllowedAppointment}
                helperText={errors.minimumAllowedAppointment?.message}
                value={gift.minimumAllowedAppointment}
              />
            )}
          />
          <Controller
            name="maximumAllowedAppointment"
            control={control}
            rules={{
              required: '最遲可預約時間是必填項目。',
              min: { value: 1, message: '最遲可預約時間必須大於 0。' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="贏家獲獎後最遲可預約時間（天）"
                type="number"
                fullWidth
                sx={{ marginTop: '16px', ...input2end, width: '100%' }}
                error={!!errors.maximumAllowedAppointment}
                helperText={errors.maximumAllowedAppointment?.message}
                value={gift.maximumAllowedAppointment}
              />
            )}
          />
          <Controller
            name="market"
            control={control}
            defaultValue="Malaysia"
            rules={{
              required: '禮品目標市場是必填項目。',
            }}
            render={({ field }) => (
              <Dropdown<keyof CreateGiftRequest>
                {...field}
                label="禮品目標市場"
                listItem={MARKET_LIST}
                onChange={(name, e) => field.onChange(e.target.value)}
                sx={{ marginTop: '16px', ...input2end, width: '100%' }}
                value={field.value || 'Malaysia'}
              />
            )}
          />
        </div>
        <div style={input2end}>
          <div>
            <Button startIcon={<AddIcon />} onClick={handleAddItem}>
              添加兑换时间段
            </Button>
          </div>
          <List style={{ maxHeight: '50vh', overflow: 'auto' }}>
            {editingValues.map((value, index) => (
              <ListItem key={index}>
                <TextField
                  value={value}
                  onChange={(e) => handleChangeItem(index, e.target.value)}
                  fullWidth
                />
                <DeleteButton onClick={() => handleDeleteItem(index)} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};
