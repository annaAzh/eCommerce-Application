import { FC } from 'react';
import Cat from 'shared/assets/img/catNotFound.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './NotFound.css';

const ButtonLink = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 3rem;
  background: var(--green);
  &:hover {
    background: var(--main-color-3) !important;
  }
`;

export const NotFound: FC = () => {
  return (
    <div className="container-page-notFound">
      <img className="img-cat-page-notFound" src={Cat} alt="Cat"></img>
      <div className="container-description-page-notFound">
        <h1 className="description-page-notFound">
          <span>
            404<br></br>
          </span>
          Oh page not found
        </h1>
        <ButtonLink type="primary" size="large">
          <Link to="main" className="link-page-notFound">
            &#10149; Main Page
          </Link>
        </ButtonLink>
      </div>
    </div>
  );
};
