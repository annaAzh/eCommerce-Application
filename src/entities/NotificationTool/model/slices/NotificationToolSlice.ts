import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationToolSchema } from '../types/NotificationToolTypes';

const initialState: NotificationToolSchema = {
  message: '',
  type: 'success',
  description: undefined,
  placement: 'bottomRight',
  messageId: undefined,
};

export const notificationToolSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(
      state: NotificationToolSchema,
      action: PayloadAction<Partial<NotificationToolSchema> & { message: string }>,
    ) {
      const { message, type, description, placement, messageId } = action.payload;
      state.message = message;
      state.type = type || 'success';
      state.description = description;
      state.placement = placement || 'bottomRight';
      state.messageId = messageId || Math.random();
    },
  },
});

export const { reducer: notificationReducer } = notificationToolSlice;

export const { setNotificationMessage } = notificationToolSlice.actions;
