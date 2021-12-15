import { createSlice, createSelector, Dictionary } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import faker from 'faker';
import _ from 'lodash';
import { changeDate } from '../timeline/timelineSlice';

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
  items: Array<Purchase>
}

export const initialState: PurchaseState = {
  items: initialItemsArray,
}

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeDate, (state, action) => {
      state.items = generatePurchaseData()
    })
  }
});

export const purchasesSelector = (state: RootState) => state.purchase.items;

export const purchasesByIdSelector = createSelector(purchasesSelector, (items: Array<Purchase>) => {
  const purchasesMap: Dictionary<Purchase> = {}
  for (const item of items) {
    purchasesMap[`${item.id}`] = item
  }
  return purchasesMap;
})

export default purchaseSlice.reducer;

