import Menu from 'antd/es/menu';
import ConfigProvider from 'antd/es/config-provider';
import Logo from 'shared/assets/img/logoHeader.png';
import { Link, useLocation } from 'react-router-dom';
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

export const Header = (): JSX.Element => {
  const location: string = useLocation().pathname.replace('/', '');
  return (
    <header className="header no-active">
      <Link to="main">
        <img className="logo-header" src={Logo} alt="logo"></img>
      </Link>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemBg: '#1c252c',
              darkItemSelectedBg: ' #1c252c',
              darkSubMenuItemBg: '#1c252c',
              darkPopupBg: '#1c252c',
              darkItemColor: '#6d972e',
              fontSize: 20,
            },
          },
        }}
      >
        <Menu
          className="menu"
          theme="dark"
          selectedKeys={[location] || ''}
          mode="horizontal"
          triggerSubMenuAction="click"
          items={links}
        />
      </ConfigProvider>
    </header>
  );
};
