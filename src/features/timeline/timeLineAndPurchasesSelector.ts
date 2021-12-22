import { createSelector, Dictionary } from '@reduxjs/toolkit';
import createCachedSelector from 're-reselect';
import { RootState } from '../../app/store';
import { partiesByPurchaseIdSelector, Party } from '../party/partySlice';
import { Purchase, purchasesByIdSelector } from "../purchase/purchaseSlice";
import { itemsSelector, selectedItemIdSelector, TimelineItem } from "./timelineSlice";

export interface TimelineItemPurchase extends TimelineItem {
  purchase?: Purchase;
  party?: Party;
}

export const timelineAndPurchasesSelector = createSelector(
  purchasesByIdSelector, 
  itemsSelector, 
  partiesByPurchaseIdSelector, 
  (purchasesById: Dictionary<Purchase>, items: TimelineItem[], partiesByPurchaseId: Dictionary<Party>): Array<TimelineItemPurchase> => {
    const timelineItemsPurchase: Array<TimelineItemPurchase> = [];
    for (const timelineItem of items) {
      timelineItemsPurchase.push({ ...timelineItem, purchase: purchasesById[`${timelineItem.purchaseId}`], party: partiesByPurchaseId[`${timelineItem.purchaseId}`] })
    }
    return timelineItemsPurchase;
  }
);


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


// selected timeline item to display details
export const selectedTimelineItemSelector = createSelector(
  selectedItemIdSelector, 
  timelineAndPurchasesByIdSelector, 
  (selectedItemId: number | undefined, timelineAndPurchasesById: Dictionary<TimelineItemPurchase>) => {
    return timelineAndPurchasesById[`${selectedItemId}`];
  }
)