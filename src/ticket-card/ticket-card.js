import React from 'react';

import styles from './ticket-card.module.scss';

const padTime = (time) => String(time).padStart(2, '0'); //2 желаемая длина строки 0  добавить слева если длина строки меньше


const getDate = (stringDate, duration) => {
  const date = new Date(stringDate);

  const startHours = padTime(date.getHours());
  const startMinutes = padTime(date.getMinutes());

  date.setMinutes(date.getMinutes() + duration);

  const endHours = padTime(date.getHours());
  const endMinutes = padTime(date.getMinutes());

  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
};

const TicketCard = ({ price, carrier, segments }) => {
  const logoUrl = `//pics.avs.io/99/36/${carrier}.png`;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.price}>{price.toLocaleString()} Р</div>
        <img src={logoUrl} alt={`${carrier} logo`} className={styles.logo} />
      </div>

      <div className={styles.infoGrid}>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <div className={styles.infoBlock}>
              <div className={styles.label}>{`${segment.origin} - ${segment.destination}`}</div>
              <div className={styles.value}>{getDate(segment.date, segment.duration)}</div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.label}>В ПУТИ</div>
              <div className={styles.value}>{formatDuration(segment.duration)}</div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.label}>
                {segment.stops.length === 0
                  ? 'БЕЗ ПЕРЕСАДОК'
                  : `${segment.stops.length} ПЕРЕСАДК${segment.stops.length > 1 ? 'И' : 'А'}`}
              </div>
              <div className={styles.value}>
                {segment.stops.length > 0 ? segment.stops.join(', ') : '-'}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;