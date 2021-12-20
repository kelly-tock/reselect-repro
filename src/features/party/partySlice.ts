import { createSlice, createSelector, Dictionary } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import faker from 'faker';
import _ from 'lodash';
import { changeDate } from '../timeline/timelineSlice';

export interface Party {
  tableId: number;
  id: number;
  purchaseId: number;
  firstName: string;
}

const generatePartyData = (): Array<Party> => {
  const items: Array<Party> = [];
  for (let i = 1; i < 1000; i++) {
    items.push({
      tableId: 1,
      id: i,
      purchaseId: _.random(1, 200, false) + i,
      firstName: faker.name.firstName()
    })
  }
  return items;
}


const initialPartiesArray = generatePartyData();


export interface PartyState {
  parties: Array<Party>
}

export const initialState: PartyState = {
  parties: initialPartiesArray,
}

export const partySlice = createSlice({
  name: 'parties',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeDate, (state, action) => {
      state.parties = generatePartyData()
    })
  }
});

export const partiesSelector = (state: RootState) => state.party.parties;

export const partiesByPurchaseIdSelector = createSelector(partiesSelector, (parties: Array<Party>) => {
  const partyMap: Dictionary<Party> = {}
  for (const party of parties) {
    partyMap[`${party.purchaseId}`] = party;
  }
  return partyMap;
})

export default partySlice.reducer;

