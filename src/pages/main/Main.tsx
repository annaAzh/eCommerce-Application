import { FC } from 'react';
import ImgKittens from 'shared/assets/img/kittensMain.png';
import './Main.css';
import Sider from 'antd/es/layout/Sider';
import Menu from 'antd/es/menu';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/types';

interface LinkOfPage {
  key: string;
  label: JSX.Element;
}

const links: LinkOfPage[] = [
  {
    key: Paths.catalog,
    label: (
      <Link className="sider-link" to={`/${Paths.catalog}`}>
        Catalog
      </Link>
    ),
  },
  {
    key: Paths.card,
    label: (
      <Link className="sider-link" to={`/${Paths.card}`}>
        Card
      </Link>
    ),
  },
  {
    key: Paths.profile,
    label: (
      <Link className="sider-link" to={`/${Paths.profile}`}>
        Profile
      </Link>
    ),
  },
  {
    key: Paths.registration,
    label: (
      <Link className="sider-link" to={`/${Paths.registration}`}>
        Registration
      </Link>
    ),
  },
  {
    key: Paths.login,
    label: (
      <Link className="sider-link" to={`/${Paths.login}`}>
        Login
      </Link>
    ),
  },
];

export const Main: FC = () => {
  return (
    <div className="wrapper-main wrapper-page">
      <Sider>
        <Menu className="sider-menu" theme="dark" items={links}></Menu>
      </Sider>
      <img className="img-kittens" src={ImgKittens} alt="kittens"></img>
    </div>
  );
};
