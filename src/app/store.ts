import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import timelineReducer from '../features/timeline/timelineSlice';
import purchaseReducer from '../features/purchase/purchaseSlice';
import partyReducer from '../features/party/partySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timeline: timelineReducer,
    purchase: purchaseReducer,
    party: partyReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
