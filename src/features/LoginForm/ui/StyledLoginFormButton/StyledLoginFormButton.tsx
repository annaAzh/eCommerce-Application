import { Button } from 'antd';
import styled from 'styled-components';

const StyledLoginFormButton = styled(Button)`
  width: 6rem;
  background: var(--green);
  &:hover {
    background: var(--main-color-3) !important;
  }
`;

export default StyledLoginFormButton;
