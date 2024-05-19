import { FC } from 'react';
import Cat from 'shared/assets/img/catNotFound.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PrimaryControlButton } from 'shared/ui';
import './NotFound.css';

const ButtonLink = styled(PrimaryControlButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 7% 3%;
  }
`;

export const NotFound: FC = () => {
  return (
    <div className="container-page-notFound wrapper-page">
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
