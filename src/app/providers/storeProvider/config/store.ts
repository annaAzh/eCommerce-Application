import { configureStore } from '@reduxjs/toolkit';
import { StateSchema, rootReducer } from './combineReducers';



export const store = configureStore<StateSchema>({
  reducer: {...rootReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;