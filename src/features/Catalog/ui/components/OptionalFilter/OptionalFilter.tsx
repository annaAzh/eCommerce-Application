import { Checkbox, Dropdown } from 'antd';
import { FC, useEffect, useState } from 'react';
import { FilterLabel } from '../FilterLabel/FilterLabel';

interface OptionalFilterProps {
  handleData: (currentValue: string, prevValue?: string) => void;
  filter: [string, string[]];
}

export const OptionalFilter: FC<OptionalFilterProps> = ({ filter, handleData }) => {
  const filterName = filter[0];
  const filterValues = [...filter[1]].sort((a: string, b: string) => a.localeCompare(b));
  const [prevValue, setPrevValue] = useState<string>();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handler = (value: string) => {
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }
  };

  useEffect(() => {
    if (checkedItems.length === 0 && !prevValue) return;
    if (checkedItems.length === 0 && prevValue) {
      const newValue = '';
      handleData(newValue, prevValue);
      setPrevValue(newValue);
    } else {
      let newValue = `variants.attributes.${filterName}:`;
      checkedItems.forEach((value, index) => {
        if (index === 0) newValue += `"${value}"`;
        else newValue += `, "${value}"`;
      });
      handleData(newValue, prevValue);
      setPrevValue(newValue);
    }
  }, [checkedItems]);

  const items = filterValues.map((name, index) => {
    return {
      key: index,
      label: <Checkbox onClick={() => handler(name)}>{name}</Checkbox>,
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
