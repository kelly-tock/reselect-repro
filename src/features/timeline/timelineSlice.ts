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

interface SelectItemAction {
  type: 'timeline/selectItem';
  payload: number;
}

interface ClearSelectedItemAction {
  type: 'timeline/clearSelectedItem';
}

interface ChangeDateAction {
  type: 'timeline/changeDate';
  payload: string;
}

export const selectItem = (itemId: number): SelectItemAction => ({
  type: 'timeline/selectItem',
  payload: itemId
})

export const clearSelectedItem = (): ClearSelectedItemAction => ({
  type: 'timeline/clearSelectedItem',
})

export const changeDate = (dateString: string): ChangeDateAction => ({
  type: 'timeline/changeDate',
  payload: dateString
})

export type TimelineActions = SelectItemAction | ClearSelectedItemAction | ChangeDateAction;

export default function timelineReducer(state = initialState, action: TimelineActions): TimelineState {
  const { type } = action;

  switch (type) {
    case 'timeline/selectItem': {
      return {
        ...state,
        selectedTimelineItemId: action.payload
      };
    }
    case 'timeline/clearSelectedItem': {
      return {
        ...state,
        selectedTimelineItemId: undefined,
      };
    }
    case 'timeline/changeDate': {
      return {
        ...state,
        selectedDateTime: action.payload,
        items: generateNewDateTimeData(action.payload),
        selectedTimelineItemId: undefined
      };
    }
    default:
      return state;
  }
}

export const itemsSelector = (state: RootState) => state.timeline.items;
export const selectedItemIdSelector = (state: RootState) => state.timeline.selectedTimelineItemId;
export const selectedDateTimeSelector = (state: RootState) => state.timeline.selectedDateTime;
