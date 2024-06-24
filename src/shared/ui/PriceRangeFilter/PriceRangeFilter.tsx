import { MenuProps, Slider, Dropdown, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import styles from './PriceRangeFilter.module.css';
import { FilterLabel } from '../FilterLabel/FilterLabel';
import { SearchQueryProps } from 'shared/types';

const indexMinPriceRange = 0;
const indexMaxPriceRange = 1;

interface PriceRangeFilterProps {
  handleData: (data: Required<Pick<SearchQueryProps, 'priceRange'>> | undefined) => void;
  minAndMax: { min: number; max: number };
}

export const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ handleData, minAndMax }) => {
  const { min, max } = minAndMax;
  const [priceRangeArray, setPriceRange] = useState<number[]>([min, max]);
  useEffect(() => {
    setPriceRange([min, max]);
  }, [minAndMax]);

  const onChangeSliderHandler = (value: number[]) => {
    setPriceRange(value);
  };
  const onChangeCompleteSliderHandler = (value: number[]) => {
    const priceRange = `variants.price.centAmount:range (${value[indexMinPriceRange] * 100} to ${value[indexMaxPriceRange] * 100})`;
    handleData({ priceRange });
  };
  const minPriceRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceRange([parseFloat(event.target.value), priceRangeArray[indexMaxPriceRange]]);

  const maxPriceRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceRange([priceRangeArray[indexMinPriceRange], parseFloat(event.target.value)]);

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
                value={priceRangeArray[indexMinPriceRange]}
                onChange={minPriceRangeHandler}
              />
              <Input
                style={{ width: '100px' }}
                placeholder="to"
                type="number"
                value={priceRangeArray[indexMaxPriceRange]}
                onChange={maxPriceRangeHandler}
              />
            </div>
            <Slider
              min={min}
              max={max}
              range
              defaultValue={[min, max]}
              onChange={onChangeSliderHandler}
              value={priceRangeArray}
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
