import { Button } from 'antd';
import styled from 'styled-components';

const PrimaryControlButton = styled(Button)`
  width: 6rem;
  background: var(--main-color-3);
  &:hover {
    background: var(--green) !important;
  }
`;

export { PrimaryControlButton };
