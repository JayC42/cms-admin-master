import React, { useEffect, useRef, useState } from 'react';
import { Column, Item } from './feature/drag-and-drop/Column.tsx';
import { Button } from '@mui/material';
import { Toast } from '../../../utils/Toast.ts';
import Dropdown from '../../common/Dropdown.tsx';
import { REWARD_CATEGORY_LIST } from '../../consts.ts';
import { useUpdateFeatureItemListApi } from '../../../services/gift/updateFeatureItemList.gift.ts';
import { useGetFeatureItemApi } from '../../../services/gift/featuredItem.gift.ts';

interface Props {
  onClose: () => void;
}

export const GiftFeatures: React.FC<Props> = ({ onClose }) => {
  const [columns, setColumns] = useState<Record<string, Item[]>>({
    normal: [],
    featured: [],
  });

  const moveToFeaturedRef = useRef<string[]>([]);
  const moveFromFeaturedRef = useRef<string[]>([]);

  const [type, setType] = React.useState<string>('all');

  const { data } = useGetFeatureItemApi({
    queryParams: {
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      type: 'all',
    },
  });
  useEffect(() => {
    if (data?.success) {
      setColumns({
        normal: data.items.nonFeaturedItems,
        featured: data.items.featuredItems,
      });
    }
  }, [data]);

  const handleDrop = (item: Item, targetColumnId: string, targetIndex: number) => {
    setColumns((prevColumns) => {
      const sourceColumnId = Object.keys(prevColumns).find((key) =>
        prevColumns[key].some((i) => i.id === item.id),
      );

      if (!sourceColumnId) return prevColumns;

      const sourceItems = [...prevColumns[sourceColumnId]];
      const itemIndex = sourceItems.findIndex((i) => i.id === item.id);
      const [movedItem] = sourceItems.splice(itemIndex, 1);

      if (sourceColumnId === targetColumnId) {
        sourceItems.splice(targetIndex, 0, movedItem);
        return {
          ...prevColumns,
          [sourceColumnId]: sourceItems,
        };
      }

      const targetItems = [...prevColumns[targetColumnId]];
      targetItems.splice(targetIndex, 0, movedItem);

      if (targetColumnId === 'featured' && sourceColumnId === 'normal') {
        if (!moveToFeaturedRef.current.includes(item.id)) {
          moveToFeaturedRef.current.push(item.id);
        }
      } else if (targetColumnId === 'normal' && sourceColumnId === 'featured') {
        if (!moveFromFeaturedRef.current.includes(item.id)) {
          moveFromFeaturedRef.current.push(item.id);
        }
      }

      const setToFeatured = new Set(moveToFeaturedRef.current);
      const setFromFeatured = new Set(moveFromFeaturedRef.current);

      const commonItems = [...setToFeatured].filter((id) => setFromFeatured.has(id));

      moveToFeaturedRef.current = moveToFeaturedRef.current.filter(
        (id) => !commonItems.includes(id),
      );
      moveFromFeaturedRef.current = moveFromFeaturedRef.current.filter(
        (id) => !commonItems.includes(id),
      );

      return {
        ...prevColumns,
        [sourceColumnId]: sourceItems,
        [targetColumnId]: targetItems,
      };
    });
  };

  const { mutateAsync } = useUpdateFeatureItemListApi();

  const handleSubmit = async () => {
    const maxWeightage = columns.featured.length;
    const items = columns.featured.map((item, index) => ({
      id: item.id,
      weightage: maxWeightage - index,
    }));
    items.push(
      ...columns.normal.map((item) => ({
        id: item.id,
        weightage: 0,
      })),
    );

    const response = await mutateAsync({ data: items });
    if (response.success) {
      Toast.success('禮品順序更新成功');
      onClose();
    } else {
      console.log(response.error);
      Toast.error('禮品順序更新失敗');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '49.5%' }}>
          <div style={sxStyle.column}>
            <div style={{ alignContent: 'center' }}>普通禮品</div>
            <div style={{ width: '40px' }}></div>
            <Dropdown
              label="類型"
              listItem={REWARD_CATEGORY_LIST}
              name="type"
              onChange={(name, e) => setType(e.target.value)}
              value={type}
              sx={{ width: '50%', marginRight: '1%' }}
            />
          </div>
          <Column id="normal" items={columns.normal} onDrop={handleDrop} />
        </div>
        <div style={{ width: '1%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', width: '49.5%' }}>
          <div style={{ height: '60px', alignContent: 'center' }}>重點禮品</div>
          <Column id="featured" items={columns.featured} onDrop={handleDrop} />
        </div>
      </div>
      <div style={{ height: '10px' }} />
      <Button color="primary" variant="contained" onClick={handleSubmit}>
        更新重點禮品
      </Button>
    </div>
  );
};

const sxStyle = {
  column: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    height: '60px',
    justifyContent: 'center' as const,
  },
};
