/**
 * Format a date string to a readable format
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

/**
 * Format a date to ISO string (YYYY-MM-DDThh:mm) for HTML input[type="datetime-local"]
 * @param date - The date to format
 * @returns ISO formatted date string
 */
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().slice(0, 16);
};

/**
 * Check if a date is in the past
 * @param dateString - The date string to check
 * @returns Boolean indicating if the date is in the past
 */
export const isDateInPast = (dateString: string): boolean => {
  return new Date(dateString) < new Date();
};

/**
 * Check if a date is in the future
 * @param dateString - The date string to check
 * @returns Boolean indicating if the date is in the future
 */
export const isDateInFuture = (dateString: string): boolean => {
  return new Date(dateString) > new Date();
};
