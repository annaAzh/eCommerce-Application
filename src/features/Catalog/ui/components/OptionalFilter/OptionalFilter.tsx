import { Dropdown } from 'antd';
import { FC, useState } from 'react';
import { FilterLabel } from '../FilterLabel/FilterLabel';

interface OptionalFilterProps {
  handleData: (currentValue: string, prevValue?: string) => void;
  filter: [string, string[]];
}

export const OptionalFilter: FC<OptionalFilterProps> = ({ filter, handleData }) => {
  const filterName = filter[0];
  const filterProps = filter[1];
  const [prevValue, setPrevValue] = useState<string>();

  const handler = (value: string) => {
    const newValue = `variants.attributes.${filterName}:"${value}"`;
    handleData(newValue, prevValue);
    setPrevValue(newValue);
  };

  const items = filterProps.map((name, index) => {
    return {
      key: index,
      label: <div onClick={() => handler(name)}>{name}</div>,
    };
  });

  return (
    <>
      <Dropdown menu={{ items, selectable: true }} placement="bottomLeft">
        <FilterLabel>{filterName}</FilterLabel>
      </Dropdown>
    </>
  );
};
