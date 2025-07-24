type Page1DocInput = {
  Item: string;
  品牌: string;
  型號: string;
  詳細說明: string;
  獎池上限: string;
  公開時間: string;
  參與時間: string;
  移除時間: string;
  禮品類型: string;
  自動選擇得獎者: string;
  得獎者選擇時間: string;
  特殊標籤: string;
  禮品標籤: string;
};

export const convertPage1ToObject = (item: Page1DocInput) => {
  return {
    id: item['Item'] as string,
    label: [
      {
        locale: 'zh-CN',
        title: String(item['品牌']),
        subTitle: String(item['型號']),
        description: String(item['詳細說明']),
      },
    ],
    poolQuota: item['獎池上限'],
    timeToPublic: item['公開時間'],
    timeToRelease: item['參與時間'],
    timeToRemove: item['移除時間'],
    type: item['禮品類型'],
    autoSelectWinner: item['自動選擇得獎者'],
    winnerSelectionTime: item['得獎者選擇時間'] || '5',
    badgeCode: item['特殊標籤'],
    tags: item['禮品標籤'],
  };
};
