import { MenuProps, Slider, Dropdown, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import styles from '../../Catalog.module.css';
import { FilterLabel } from '../FilterLabel/FilterLabel';

const indexMinPriceRange = 0;
const indexMaxPriceRange = 1;
// const defaultMin = 0;
// const defaultMax = 100;

interface PriceRangeFilterProps {
  handleData: (str: string) => void;
  minAndMax: { min: number; max: number };
}

export const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ handleData, minAndMax }) => {
  const { min, max } = minAndMax;
  const [priceRange, setPriceRange] = useState<number[]>([min, max]);
  useEffect(() => {
    console.log(minAndMax);
    setPriceRange([min, max]);
  }, [minAndMax]);

  const onChangeSliderHandler = (value: number[]) => {
    setPriceRange(value);
  };
  const onChangeCompleteSliderHandler = (value: number[]) => {
    const returnValue = `variants.price.centAmount:range (${value[indexMinPriceRange] * 100} to ${value[indexMaxPriceRange] * 100})`;
    handleData(returnValue);
  };
  const minPriceRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceRange([parseFloat(event.target.value), priceRange[indexMaxPriceRange]]);

  const maxPriceRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceRange([priceRange[indexMinPriceRange], parseFloat(event.target.value)]);

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
          <div style={{ width: '100%' }}>
            <div>
              <Input
                style={{ width: '100px' }}
                placeholder="From"
                type="number"
                value={priceRange[indexMinPriceRange]}
                onChange={minPriceRangeHandler}
              />
              <Input
                style={{ width: '100px' }}
                placeholder="to"
                type="number"
                value={priceRange[indexMaxPriceRange]}
                onChange={maxPriceRangeHandler}
              />
            </div>
            <Slider
              min={min}
              max={max}
              range
              defaultValue={[min, max]}
              onChange={onChangeSliderHandler}
              value={priceRange}
              onChangeComplete={onChangeCompleteSliderHandler}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <FilterLabel>price</FilterLabel>
    </Dropdown>
  );
};
