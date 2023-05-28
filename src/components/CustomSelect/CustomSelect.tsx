import { StyledSelect } from '../../utils/styledMUI';
import { MenuItem } from '@mui/material';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import styles from '../../App.module.css';
import React from 'react';
import { TCountry } from '../../App';

type TCustomSelect = {
  country: TCountry;
  optionList: TCountry[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};
const CustomSelect = (props: TCustomSelect) => {
  const { country, optionList, setFieldValue } = props;

  return (
    <StyledSelect
      value={country.id ?? ''}
      id="country"
      name="country"
      variant="outlined"
      size="small"
      renderValue={() => <span>{country.name ?? ''}</span>}
      onChange={(event) => {
        const selectedCountry = optionList.find((country) => country.id === event.target.value);
        setFieldValue('country', selectedCountry);
      }}
    >
      {optionList.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
          {item.id === country.id && <CheckIcon className={styles.checkIcon} />}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default CustomSelect;
