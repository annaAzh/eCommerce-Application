import { notification } from 'antd';
import { FC, useEffect } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getAllNotificationProps } from '../model/selectors/NotificationTool';

const NotificationTool: FC = () => {
  const { message, type, description, placement, messageId } = useAppSelector(getAllNotificationProps);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (message) {
      api[type]({
        message,
        description,
        placement,
      });
    }
  }, [messageId]);

  return <>{contextHolder}</>;
};

export { NotificationTool };
