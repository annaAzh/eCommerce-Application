import { FC } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/types';
import style from './Breadcrumb.module.css';
import './Breadcrumb.css';

interface BreadcrumbProps {
  useBasePaths: boolean;
  handler: (id: string | undefined) => void;
  additionalPaths?: { title: string; path: string }[];
}
interface BreadcrumbPropsTruthy extends BreadcrumbProps {
  useBasePaths: true;
}
interface BreadcrumbPropsFalsy extends BreadcrumbProps {
  useBasePaths: false;
  additionalPaths: { title: string; path: string }[];
}

export const Breadcrumbs: FC<BreadcrumbPropsTruthy | BreadcrumbPropsFalsy> = ({
  handler,
  additionalPaths,
  useBasePaths,
}) => {
  const basePath: {
    title: JSX.Element;
  }[] = useBasePaths
    ? [
        {
          title: (
            <div onClick={() => handler(undefined)}>
              <Link to={`/${Paths.main}`}>main</Link>
            </div>
          ),
        },
        {
          title: (
            <div onClick={() => handler(undefined)}>
              <Link style={{ textDecoration: 'none' }} to={`/${Paths.catalog}`}>
                catalog
              </Link>
            </div>
          ),
        },
      ]
    : [];
  if (additionalPaths) {
    additionalPaths.forEach((path, index) => {
      basePath.push({
        title: (
          <a className={index === additionalPaths.length - 1 ? style.item : ''} onClick={() => handler(path.path)}>
            {path.title}
          </a>
        ),
      });
    });
  }

  return (
    <div className={style.cover}>
      <Breadcrumb className={style.bread} items={basePath} />
    </div>
  );
};
