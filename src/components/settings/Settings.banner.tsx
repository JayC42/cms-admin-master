import React, { useCallback, useState } from 'react';
import { FilterForm } from './banner/FilterForm.tsx';
import { format } from 'date-fns';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { AddBannerDialog } from './banner/banner.add.tsx';
import { ViewBannerDialog } from './banner/banner.view.tsx';
import { listSpacing } from '../componentStyles.ts';
import { BannerListItem, useGetBannerList } from '../../services/banner/getList.banner.ts';

export const SettingsBanner: React.FC = () => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);
  const [toggleAddDialogOpen, setToggleAddDialogOpen] = useState(false);

  const [selectionId, setSelectionId] = useState<string>('');
  const [selectionPath, setSelectionPath] = useState<string>('');

  const [list, setList] = useState<BannerListItem[]>([]);
  const [cachedData, setCachedData] = useState<{ startDate: string; endDate: string }>({
    startDate: format(new Date(new Date().setDate(1)), 'yyyy-MM-dd'),
    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1, 0)), 'yyyy-MM-dd'),
  });

  const getBannerList = useGetBannerList(
    {
      queryParams: cachedData,
    },
    {
      onFreshFetched: (data) => {
        if (data.success) {
          setList((prevData) => [...prevData, ...data.banners]);
        }
      },
    },
  );

  const reloadBanner = async () => {
    setList([]);
    getBannerList.refetch();
  };

  const handleFormUpdate = useCallback((startDate: string, endDate: string) => {
    setCachedData({ startDate, endDate });
  }, []);

  const handleAdd = () => {
    setToggleAddDialogOpen(true);
  };

  const handleAction = (id: string, path: string) => {
    console.log(id);
    setSelectionId(id);
    setSelectionPath(path);
    setToggleViewDialogOpen(true);
  };

  return (
    <div>
      <FilterForm handleFormUpdate={handleFormUpdate} handleAdd={handleAdd} />
      <div style={listSpacing}></div>
      <ImageList cols={3} gap={12} sx={{ maxHeight: '70vh' }}>
        {list.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.image + '_' + item.label[0].locale}
              alt={item.label[0].title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.label[0].title}
              position="below"
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(128, 128, 128, 0.54)' }}
                  aria-label={`info about ${item.label[0].title}`}
                  onClick={() => handleAction(item.id, item.image)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <AddBannerDialog
        open={toggleAddDialogOpen}
        onClose={() => {
          setToggleAddDialogOpen(false);
          setList([]);
          reloadBanner();
        }}
      />

      <ViewBannerDialog
        open={toggleViewDialogOpen}
        bannerId={selectionId}
        rootImagePath={selectionPath}
        onClose={() => {
          setToggleViewDialogOpen(false);
          setList([]);
          reloadBanner();
        }}
      />
    </div>
  );
};
