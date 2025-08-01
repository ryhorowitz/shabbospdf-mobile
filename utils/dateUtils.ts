// Centralized date formatting utilities

export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', options);
};

export const formatTime = (date: string | Date, options: Intl.DateTimeFormatOptions = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    ...options,
  });
};

export const formatFullDate = (date: string | Date) => {
  return formatDate(date, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatShortDate = (date: string | Date) => {
  return formatDate(date, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCandleTime = (date: string | Date) => {
  return formatTime(date, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatCandleDate = (date: string | Date) => {
  return formatDate(date, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}; 