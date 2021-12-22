import { createSlice, createSelector, Dictionary } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import faker from 'faker';
import _ from 'lodash';
import { TimelineActions } from '../timeline/timelineSlice';

export interface Purchase {
  tableId: number;
  id: number;
  ticketTypeId: number;
  ticketTypeDescription: string;
}

const generatePurchaseData = (): Array<Purchase> => {
  const items: Array<Purchase> = [];
  for (let i = 1; i < 1000; i++) {
    items.push({
      tableId: 1,
      id: _.random(1, 200, false) + i,
      ticketTypeId: i,
      ticketTypeDescription: faker.lorem.words(500), 
    })
  }
  return items;
}


const initialItemsArray = generatePurchaseData();


export interface PurchaseState {
  purchases: Array<Purchase>
}

export const initialState: PurchaseState = {
  purchases: initialItemsArray,
}

export default function purchaseReducer(state = initialState, action: TimelineActions): PurchaseState {
  const { type } = action;

  switch (type) {
    case 'timeline/changeDate': {
      return {
        ...state,
        purchases: generatePurchaseData(),
      };
    }
    default:
      return state;
  }
}

export const purchasesSelector = (state: RootState) => state.purchase.purchases;

export const purchasesByIdSelector = createSelector(purchasesSelector, (purchases: Array<Purchase>) => {
  const purchasesMap: Dictionary<Purchase> = {}
  for (const purchase of purchases) {
    purchasesMap[`${purchase.id}`] = purchase
  }
  return purchasesMap;
})
