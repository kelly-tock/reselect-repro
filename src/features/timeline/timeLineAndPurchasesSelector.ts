import { createSelector, Dictionary } from '@reduxjs/toolkit';
import createCachedSelector from 're-reselect';
import { RootState } from '../../app/store';
import { Purchase, purchasesByIdSelector } from "../purchase/purchaseSlice";
import { itemsSelector, TimelineItem } from "./timelineSlice";

export interface TimelineItemPurchase extends TimelineItem {
  purchase?: Purchase;
}

export const timelineAndPurchasesSelector = createSelector(purchasesByIdSelector, itemsSelector, (purchasesById: Dictionary<Purchase>, items: TimelineItem[]): Array<TimelineItemPurchase> => {
  const timelineItemsPurchase: Array<TimelineItemPurchase>  = [];
  for (const timelineItem of items) {
    timelineItemsPurchase.push({ ...timelineItem, purchase: purchasesById[`${timelineItem.purchaseId}`]})
  }
  return timelineItemsPurchase;
});


export const timelineAndPurchasesByIdSelector = createSelector(timelineAndPurchasesSelector, (items: Array<TimelineItemPurchase>): Dictionary<TimelineItemPurchase> => {
  const itemsMap: Dictionary<TimelineItemPurchase> = {}
  for (const item of items) {
    itemsMap[`${item.id}`] = item
  }
  return itemsMap;
})

const itemId = (_: RootState, itemId: number) => itemId;


// react-redux docs recommended way
export const makeTimelineItemSelector = () => createSelector(timelineAndPurchasesByIdSelector, itemId, (itemsMap: Dictionary<TimelineItemPurchase>, itemId: number) => {
  return itemsMap[`${itemId}`];
})

// re-reselect way
export const selectTimelineItemSelector = createCachedSelector(timelineAndPurchasesByIdSelector, itemId, (itemsMap: Dictionary<TimelineItemPurchase>, itemId: number) => {
  return itemsMap[`${itemId}`];
})((_: RootState, itemId: number) => itemId)