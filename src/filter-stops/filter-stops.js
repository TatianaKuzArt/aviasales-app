import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStop } from '../store/stopsSlice'
import styles from './filter-stops.module.scss';

const options = [
  { label: 'Все', value: 'all' },
  { label: 'Без пересадок', value: '0' },
  { label: '1 пересадка', value: '1' },
  { label: '2 пересадки', value: '2' },
  { label: '3 пересадки', value: '3' },
];

const StopsFilter = () => {
  const checked = useSelector(state => state.stopsReducer.checked);
  const dispatch = useDispatch();

  const toggleOption = (value) => {
    dispatch(toggleStop(value));
  };

  const isChecked = (value) => {
    if (value === 'all') {
      return checked.length === options.length - 1;
    }
    return checked.includes(value);
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      {options.map(({ label, value }) => (
        <label
          key={value}
          className={`${styles.option} ${isChecked(value) ? styles.checked : ''}`}
        >
          <input
            type="checkbox"
            checked={isChecked(value)}
            onChange={() => toggleOption(value)}
          />
          <span className={styles.customCheckbox}></span>
          {label}
        </label>
      ))}
    </div>
  );
};

export default StopsFilter;