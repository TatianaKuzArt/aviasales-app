import { configureStore, combineReducers } from '@reduxjs/toolkit';
import stopsReducer from './stopsSlice';
import sortReducer from './sortSlice';
import ticketReducer from './ticketsSlice';


export const rootReducer = combineReducers({
  stopsReducer, sortReducer, ticketReducer
});

export const store =
  configureStore({
    reducer: rootReducer,
  });

