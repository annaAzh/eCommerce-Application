import Menu from 'antd/es/menu';
import ConfigProvider from 'antd/es/config-provider';
import Logo from 'shared/assets/img/logoHeader.png';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from 'shared/types';
import './Header.css';

interface LinkOfPage {
  key: string;
  label: JSX.Element;
}

const links: LinkOfPage[] = [
  {
    key: Paths.main,
    label: (
      <Link className="link-header" to={Paths.main}>
        Main
      </Link>
    ),
  },
  {
    key: Paths.catalog,
    label: (
      <Link className="link-header" to={Paths.catalog}>
        Catalog
      </Link>
    ),
  },
  {
    key: Paths.card,
    label: (
      <Link className="link-header" to={Paths.card}>
        Card
      </Link>
    ),
  },
  {
    key: Paths.profile,
    label: (
      <Link className="link-header" to={Paths.profile}>
        Profile
      </Link>
    ),
  },
  {
    key: Paths.registration,
    label: (
      <Link className="link-header" to={Paths.registration}>
        Registration
      </Link>
    ),
  },
  {
    key: Paths.login,
    label: (
      <Link className="link-header" to={Paths.login}>
        Login
      </Link>
    ),
  },
];

export const Header = (): JSX.Element => {
  const location: string = useLocation().pathname.replace('/', '');
  return (
    <header className="header no-active">
      <Link to={Paths.main}>
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
          selectedKeys={location !== '' ? [location] : [Paths.main]}
          mode="horizontal"
          triggerSubMenuAction="click"
          items={links}
        />
      </ConfigProvider>
    </header>
  );
};
