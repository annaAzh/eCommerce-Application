import Header from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import ConfigProvider from 'antd/es/config-provider';
import { Link } from 'react-router-dom';
import './Header.css';

interface LinkOfPage {
  key: string;
  label: JSX.Element;
}

const links: LinkOfPage[] = [
  {
    key: 'registration',
    label: (
      <Link className="link-header" to="registration">
        Registration
      </Link>
    ),
  },
  {
    key: 'login',
    label: (
      <Link className="link-header" to="login">
        Login
      </Link>
    ),
  },
];

export const TotalHeader = (): JSX.Element => {
  return (
    <Header className="header">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              horizontalItemSelectedColor: '#000000',
              darkItemBg: '#000000',
              horizontalItemHoverColor: '#d7f5da',
              darkItemSelectedBg: '#000000',
              darkItemColor: '#7ee286',
              darkSubMenuItemBg: '#000000',
              darkPopupBg: '#000000',
              fontSize: 24,
              motionDurationMid: '0.1s',
            },
          },
        }}
      >
        <Menu className="menu" theme="dark" mode="horizontal" triggerSubMenuAction="click" items={links} />
      </ConfigProvider>
    </Header>
  );
};
