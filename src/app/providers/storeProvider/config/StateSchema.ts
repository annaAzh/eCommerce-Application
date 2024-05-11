import { Reducer } from '@reduxjs/toolkit';
import { Token } from 'shared/api/actions/types/tokenTypes';

export interface StateSchema {
  accessToken: Reducer<Token>;
  refreshToken: Reducer<Token>;
}
