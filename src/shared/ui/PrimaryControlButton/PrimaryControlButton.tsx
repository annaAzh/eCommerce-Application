import { Button } from 'antd';
import styled from 'styled-components';

const PrimaryControlButton = styled(Button)`
  min-width: 6rem;
  width: content-fit;
  background: var(--main-color-3);
  &:not([disabled]):hover {
    background: var(--green) !important;
  }
`;

export { PrimaryControlButton };
