import React, { useEffect, useRef, useState } from 'react';
import { getFirstDayOfMonth } from '../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../utils/getLastDayOfMonth.ts';
import { FilterForm } from './list/FilterForm.tsx';
import { listSpacing } from '../../componentStyles.ts';
import { Table, TableBody, TableContainer } from '@mui/material';
import { DataHeader } from './list/DataHeader.tsx';
import { DataRow, RowAction } from './list/DataRow.tsx';
import { GiftView } from './view/Gift.view.tsx';
import { GiftImageUpload } from './imageUpload/Gift.imageUpload.tsx';
import { getLocalizedLabel } from '../../../utils/getLocalizedLabel.ts';
import { GiftDelete } from './Gift.delete.tsx';
import { useGetExportApi } from '../../../services/gift/export.gift.ts';
import { generateExcelData } from './export/ExportUtils.ts';
import { isEqual } from 'lodash-es';
import {
  useGetGiftList,
  GetGiftListParams,
  GiftListItem,
} from '../../../services/gift/getList.gift.ts';

type Props = {
  onEdit: (rewardId: string) => void;
};

const styles = {
  container: {
    height: 'calc(100vh - 200px)',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c1c1c1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#a8a8a8',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#c1c1c1 #f1f1f1',
  } as React.CSSProperties,
};

export const GiftList = ({ onEdit }: Props) => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);
  const [toggleDeleteDialogOpen, setToggleDeleteDialogOpen] = useState(false);
  const [toggleImageUploadDialogOpen, setToggleImageUploadDialogOpen] = useState(false);
  const [giftId, setGiftId] = useState<string>('');
  const [giftName, setGiftName] = useState<string>('');
  const [list, setList] = useState<GiftListItem[]>([]);
  const [cachedData, setCachedData] = useState<GetGiftListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
  });
  const lastElementRef = useRef<HTMLTableRowElement | null>(null);

  const getGiftList = useGetGiftList(
    {
      queryParams: cachedData,
    },
    {
      onFreshFetched: (data) => {
        setList((prev) => [...prev, ...data.result]);
      },
    },
  );

  useEffect(() => {
    const data = getGiftList.data;
    if (!data?.nextRefKey) return;
    const observerInstance = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data?.nextRefKey) {
          getGiftList.refetch();
        }
      },
      { threshold: 1.0 },
    );

    if (lastElementRef.current) {
      observerInstance.observe(lastElementRef.current);
    }

    return () => observerInstance.disconnect();
  }, [getGiftList.data?.nextRefKey]);

  const handleFormUpdate = (formData: GetGiftListParams) => {
    if (!isEqual(cachedData, formData)) {
      setList([]);
      setCachedData(formData);
    }
  };

  const getExportApi = useGetExportApi({ queryParams: cachedData, options: { enabled: false } });

  const onExport = async () => {
    const response = await getExportApi.refetch();
    if (response.data?.success) {
      await generateExcelData(response.data.items, cachedData.startDate, cachedData.endDate);
    }
  };

  const handleAction = async (object: GiftListItem, action: RowAction) => {
    const localizedLabel = getLocalizedLabel(object.label);
    switch (action) {
      case 'view':
        setGiftId(object.id);
        setToggleViewDialogOpen(true);
        break;
      case 'edit':
        onEdit(object.id);
        break;
      case 'imageUpload':
        setGiftId(object.id);
        setGiftName(`${localizedLabel.title} (${localizedLabel.subTitle})`);
        setToggleImageUploadDialogOpen(true);
        break;
      case 'delete':
        setToggleDeleteDialogOpen(true);
        setGiftId(object.id);
        setGiftName(`${localizedLabel.title} (${localizedLabel.subTitle})`);
        break;
      default:
        break;
    }
  };

  const reloadData = async () => {
    setList([]);
    const response = await getGiftList.refetch();
    if (response.data) {
      setList(response.data.result);
    }
  };

  return (
    <>
      <FilterForm handleFormUpdate={handleFormUpdate} onExport={onExport} />
      <div style={listSpacing} />
      <TableContainer className="custom-scrollbar" style={styles.container}>
        <Table stickyHeader aria-label="sticky table" size={'small'}>
          <DataHeader />
          <TableBody>
            {list.map((row) => (
              <DataRow data={row} key={row.id} onAction={handleAction} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <GiftView
        open={toggleViewDialogOpen}
        onClose={() => {
          setToggleViewDialogOpen(false);
          reloadData();
        }}
        giftId={giftId}
      />
      <GiftImageUpload
        open={toggleImageUploadDialogOpen}
        onClose={() => {
          setToggleImageUploadDialogOpen(false);
          reloadData();
        }}
        giftId={giftId}
        giftName={giftName}
      />
      <GiftDelete
        open={toggleDeleteDialogOpen}
        onClose={() => {
          setToggleDeleteDialogOpen(false);
          reloadData();
        }}
        data={{ giftId, giftName }}
      />
    </>
  );
};
