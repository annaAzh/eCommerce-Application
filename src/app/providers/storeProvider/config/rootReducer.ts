import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';

export const rootReducer = combineReducers<StateSchema>({
  // Here you will need to import reducers from slices
});
