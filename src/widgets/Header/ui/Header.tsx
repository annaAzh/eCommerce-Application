import Menu from 'antd/es/menu';
import ConfigProvider from 'antd/es/config-provider';
import Logo from 'shared/assets/img/logoHeader.png';
import { Link, useLocation } from 'react-router-dom';
import { getUserIsLoginedStatus } from 'entities/User';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { ButtonLogOut } from 'features/LogoutUser';
import { Paths } from 'shared/types';
import './Header.css';
import {
  FormOutlined,
  HomeOutlined,
  LoginOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CartBadge } from 'features/DisplayGoodsQuantity';

interface LinkOfPage {
  key: Paths | string;
  label: JSX.Element;
}

const links: LinkOfPage[] = [
  {
    key: Paths.main,
    label: (
      <Link className="link-profile" to={Paths.main}>
        <Tooltip title="home">
          <HomeOutlined style={{ fontSize: '2rem' }} />
        </Tooltip>
      </Link>
    ),
  },
  {
    key: Paths.catalog,
    label: (
      <Link className="link-profile" to={Paths.catalog}>
        <Tooltip title="catalog">
          <ProductOutlined style={{ fontSize: '2rem' }} />
        </Tooltip>
      </Link>
    ),
  },
  {
    key: Paths.about,
    label: (
      <Link className="link-profile" to={Paths.about}>
        <Tooltip title="about us">
          <TeamOutlined style={{ fontSize: '2rem' }} />
        </Tooltip>
      </Link>
    ),
  },
  {
    key: Paths.cart,
    label: (
      <Link className="link-profile" to={Paths.cart}>
        <Tooltip title="cart">
          <CartBadge>
            <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
          </CartBadge>
        </Tooltip>
      </Link>
    ),
  },
];

const notLoginLinks: LinkOfPage[] = [
  {
    key: Paths.registration,
    label: (
      <Link className="link-profile" to={Paths.registration}>
        <Tooltip title="registration">
          <FormOutlined style={{ fontSize: '2rem' }} />
        </Tooltip>
      </Link>
    ),
  },
  {
    key: Paths.login,
    label: (
      <Link className="link-profile" to={Paths.login}>
        <Tooltip title="log-in">
          <LoginOutlined style={{ fontSize: '2rem' }} />
        </Tooltip>
      </Link>
    ),
  },
];

const loginLinks: LinkOfPage[] = [
  {
    key: Paths.profile,
    label: (
      <Link className="link-profile" to={Paths.profile}>
        <Tooltip title="profile">
          <UserOutlined style={{ fontSize: '2rem' }} />
        </Tooltip>
      </Link>
    ),
  },
  {
    key: 'logout',
    label: <ButtonLogOut />,
  },
];

export const Header = (): JSX.Element => {
  const location: string = useLocation().pathname.replace('/', '');
  const isLogin: boolean = useAppSelector(getUserIsLoginedStatus);
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
          items={isLogin ? links.concat(loginLinks) : links.concat(notLoginLinks)}
        />
      </ConfigProvider>
    </header>
  );
};
