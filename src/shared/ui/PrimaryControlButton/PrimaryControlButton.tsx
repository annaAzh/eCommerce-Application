import { Button } from 'antd';
import styled from 'styled-components';

const PrimaryControlButton = styled(Button)`
  width: 6rem;
  background: var(--green);
  &:hover {
    background: var(--main-color-3) !important;
  }
`;

export { PrimaryControlButton };
