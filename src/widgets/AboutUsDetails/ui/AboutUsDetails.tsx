import { GithubOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AboutUsType } from 'shared/types';
import style from './AboutUsDetails.module.css';

export const AboutUsDetails: FC<AboutUsType> = ({ ...props }) => {
  const { name, bio, contribution, role, imgPath, githubLink, color } = props;
  return (
    <div className={style.detailContainer} style={{ backgroundColor: `${color}` }}>
      <div className={style.imgContainer}>
        <img src={imgPath} />
      </div>
      <div>
        <Link className={style.link} to={githubLink} target="_blank">
          {name}
          <GithubOutlined style={{ marginLeft: '10px', marginRight: '10px' }} />
          <span>🐾</span>
        </Link>
        <p className={style.description}>
          <b>Role:</b> {role}
        </p>
        <p className={style.description}>
          <b>Bio:</b> {bio}
        </p>
        <p>
          <b>Contribution:</b> {contribution}
        </p>
      </div>
    </div>
  );
};
