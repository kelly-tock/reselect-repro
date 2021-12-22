import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { add, format } from 'date-fns';
import faker from 'faker';
import _ from 'lodash';
import { RootState } from '../../app/store';
import { DATETIMEFORMAT } from '../../lib/constants';

export interface TimelineItem {
  startDateTime: string;
  tableId: number;
  id: number;
  name: string;
  section: string;
  description: string;
  purchaseId: number | undefined;
}

const generateNewDateTimeData = (dateTime: string): Array<TimelineItem> => {
  const items: Array<TimelineItem> = [];
  for (let i = 1; i < 2000; i++) {
    items.push({
      startDateTime: format(add(new Date(dateTime), { minutes: i * 15 }), DATETIMEFORMAT),
      tableId: 1,
      id: i,
      name: faker.random.word(),
      section: faker.hacker.abbreviation(),
      description: faker.lorem.words(500), 
      purchaseId: i % 2 === 0 ? _.random(1, 200, false): undefined
    })
  }
  return items;
}

const initialStartDateTime = new Date();

const initialItemsArray = generateNewDateTimeData(format(initialStartDateTime, DATETIMEFORMAT));


export interface TimelineState {
  selectedTimelineItemId: number | undefined;
  items: Array<TimelineItem>
  selectedDateTime: string;
}

export const initialState: TimelineState = {
  selectedTimelineItemId: undefined,
  items: initialItemsArray,
  selectedDateTime: format(initialStartDateTime, DATETIMEFORMAT)
}

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState, 
  reducers: {
    selectItem: (state, action: PayloadAction<number>) => {
      state.selectedTimelineItemId = action.payload
    },
    clearselectedItem: (state) => {
      state.selectedTimelineItemId = undefined
    },
    changeDate: (state, action: PayloadAction<string>) => {
      state.selectedDateTime = action.payload;
      state.items = generateNewDateTimeData(action.payload);
      state.selectedTimelineItemId = undefined;
    }
  }
});

export const { selectItem, clearselectedItem, changeDate } = timelineSlice.actions;

export const itemsSelector = (state: RootState) => state.timeline.items;
export const selectedItemIdSelector = (state: RootState) => state.timeline.selectedTimelineItemId;
export const selectedDateTimeSelector = (state: RootState) => state.timeline.selectedDateTime;

export default timelineSlice.reducer;

