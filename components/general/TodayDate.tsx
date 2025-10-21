'use client';
import React, { useEffect, useState } from 'react';

type TodayDateProps = {
  locale?: 'en-US' | 'bn-BD';
  withTime?: boolean;
};

const TodayDate: React.FC<TodayDateProps> = ({ locale = 'en-US', withTime = false }) => {
  const [dateString, setDateString] = useState<string>('');
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let formattedTime = '';
    if (withTime) {
      formattedTime = today.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    setDateString(formattedDate);
    setTimeString(formattedTime);
  }, [locale, withTime]);

  if (!dateString) return null; // avoids flashing empty content

  return (
    <p className="text-muted-foreground text-sm mr-2">
      {dateString}
      {withTime && `, ${timeString}`}
    </p>
  );
};

export default TodayDate;
