'use client';
import React from 'react';

type TodayDateProps = {
  locale?: 'en-US' | 'en-US'; // default is English
  withTime?: boolean;
};

const TodayDate: React.FC<TodayDateProps> = ({ locale = 'en-US', withTime = false }) => {
  const today = new Date();
  const dateString = today.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let timeString = '';
  if (withTime) {
    timeString = today.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // ensures AM/PM is shown
    });

    // Optional: Replace AM/PM with Bangla equivalents manually
    if (locale === 'en-US') {
      timeString = timeString.replace('AM', 'AM').replace('PM', 'PM');
    }
  }

  return (
    <p className='text-muted-foreground text-sm mr-2'>
      {dateString}
      {withTime && `, ${timeString}`}
    </p>
  );
};

export default TodayDate;
