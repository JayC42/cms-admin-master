interface Page5DocInput {
  Item: string;
  最大兌換人數: string;
  最早可預約時間: string;
  二次提醒時間: string;
  最遲可預約時間: string;
  可預約時間段: string;
  市場: string;
  配送模式: string;
}

export const extractItemIndex = (item: Page5DocInput) => {
  return item['Item'] as string;
};

export const convertPage5ToObject = (item: Page5DocInput) => {
  return {
    id: item['Item'] as string,
    redeemCapacity: item['最大兌換人數'] as string,
    maximumAllowedAppointment: item['最遲可預約時間'] as string,
    minimumAllowedAppointment: item['最早可預約時間'] as string,
    secondReminder: item['二次提醒時間'] as string,
    redeemTimeSlot: item['可預約時間段'] as string,
    market: item['市場'] as string,
    deliveryOption: item['配送模式'] as string,
  };
};
