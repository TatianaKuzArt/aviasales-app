import React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import FilterTariff from '../filter-tarif';
import StopsFilter from '../filter-stops/filter-stops';
import TicketList from '../ticket-list/ticketList';
import { fetchTickets } from '../store/ticketsSlice';
import style from './app.module.scss'
import logo from '../logo/Logo.png'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickets())
  })
  return (
    <>
      <img src={logo} alt={'noImage'} className={style.logo}/>
      <div className={style.main}>
        <StopsFilter />
        <div>
          <FilterTariff />
          <TicketList />
        </div>
      </div>
    </>

  );
};


export default App;