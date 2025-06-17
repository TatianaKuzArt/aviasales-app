import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from '../store/sortSlice';
import classes from './filter-tarif.module.scss';

const FilterTariff = () => {
  const dispatch = useDispatch();
  const sortType = useSelector(state => state.sortReducer.sortType);


  return (
    <div className={classes.filterContainer}>
      <button
        className={`${classes.filter} ${sortType === 'fast' ? classes.filterActive : ''}`}
        onClick={() => dispatch(setSortType('fast'))}
      >
        Самый быстрый
      </button>
      <button
        className={`${classes.filter} ${sortType === 'optimal' ? classes.filterActive : ''}`}
        onClick={() => dispatch(setSortType('optimal'))}
      >
        Оптимальный
      </button>
      <button
        className={`${classes.filter} ${sortType === 'cheap' ? classes.filterActive : ''}`}
        onClick={() => dispatch(setSortType('cheap'))}
      >
        Самый дешевый
      </button>
    </div>
  );
};

export default FilterTariff;