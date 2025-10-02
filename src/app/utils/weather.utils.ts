/**
 * Utility functions for weather-related operations
 */

/**
 * Gets the weather icon URL from OpenWeatherMap
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Formats timestamp to localized string
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Formats date for forecast display
 */
export function formatForecastDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Capitalizes first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, letter => letter.toUpperCase());
}
