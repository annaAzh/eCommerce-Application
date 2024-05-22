type NotificationToolType = 'success' | 'info' | 'warning' | 'error';

type NotificationToolPlacement = 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

type NotificationToolSchema = {
  message: string;
  type: NotificationToolType;
  description?: string;
  placement: NotificationToolPlacement;
  messageId?: number;
};

export { NotificationToolSchema };
