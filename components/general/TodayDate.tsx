'use client';
import { useEffect, useState } from 'react';

type TodayDateProps = {
  locale?: 'en-US' | 'bn-BD';
  withTime?: boolean;
};

export default function TodayDate({
  locale = 'en-US',
  withTime = false,
}: TodayDateProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time after client mounts
    setNow(new Date());

    if (!withTime) return;

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [withTime]);

  // Render nothing until after hydration
  if (!now) return null;

  return (
    <p className="text-primary text-sm mr-2">
      {now.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      {withTime &&
        `, ${now.toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })}`}
    </p>
  );
}
