import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TicketCard from '../ticket-card/ticket-card';
import styles from './ticketList.module.scss';
import { Spin } from 'antd';
import 'antd/dist/reset.css';

const TicketList = () => {
  const tickets = useSelector(state => state.ticketReducer.tickets);
  const loading = useSelector(state => state.ticketReducer.loading);
  const checkedStops = useSelector(state => state.stopsReducer.checked);
  const sortType = useSelector(state => state.sortReducer.sortType);

  const [visibleCount, setVisibleCount] = useState(5);

  const filteredTickets = tickets.filter(ticket => {
    const totalStops = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
    return checkedStops.includes(String(totalStops));
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortType === 'cheap') {
      return a.price - b.price;
    }

    if (sortType === 'fast') {
      const aDuration = a.segments[0].duration + a.segments[1].duration;
      const bDuration = b.segments[0].duration + b.segments[1].duration;
      return aDuration - bDuration;
    }

    if (sortType === 'optimal') {
      const aScore = a.price + (a.segments[0].duration + a.segments[1].duration) * 0.5;
      const bScore = b.price + (b.segments[0].duration + b.segments[1].duration) * 0.5;
      return aScore - bScore;
    }

    return 0;
  });

  const visibleTickets = sortedTickets.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  return (
    <>
      {checkedStops.length === 0 ? (
        <div className={styles.noResults}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      ) : (
        <>
          <ul className={styles.cardTicket}>
            {visibleTickets.map((ticket, index) => (
              <li key={index}>
                <TicketCard {...ticket} />
              </li>
            ))}
          </ul>

          {visibleCount < sortedTickets.length && (
            <button className={styles.showMoreButton} onClick={showMore}>
              Показать ещё 5 билетов!
            </button>
          )}

          {!loading && (
            <div className={styles.loader}>
              <Spin size="large" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TicketList;