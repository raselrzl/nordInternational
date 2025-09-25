function convertToBengaliNumber(number: number): string {
  const bengaliDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return number
    .toString()
    .split('')
    .map(digit => bengaliDigits[parseInt(digit)])
    .join('');
}

function formatBengaliDate(date: Date): string {
  const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


  const day = convertToBengaliNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = convertToBengaliNumber(date.getFullYear());

  return `${day} ${month} ${year}`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Just Now";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `${formatBengaliDate(date)}`;
  }
}

/* ${convertToBengaliNumber(diffInDays)} দিন পূর্বের -  */