import { Button, Select, styled, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)`
  width: 100%;
  background-color: #ffffff;
  & input {
    color: var(--main-label-color);
  }
  ,
  & .MuiOutlinedInput-root {
    border-radius: 0;
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
  background-color: #ffffff;
  border-radius: 0;
  & input {
    color: var(--main-label-color);
  }
`;

export const StyledButton = styled(Button)`
  height: 60px;
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
  background-color: #ffffff;
  color: var(--main-label-color);

  &:hover {
    background-color: #ffffff;
    opacity: 0.7;
    transition: 0.2s;
  }
  &.Mui-disabled {
    color: var(--disabled-button-color);
    background-color: var(--disabled-button-bg);
  }
`;
