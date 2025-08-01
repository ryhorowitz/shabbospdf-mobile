/**
 * Weather icon mapping utility for mobile app
 * Maps weather conditions to emoji icons for simplicity
 */

export const getWeatherIcon = (shortForecast: string, isDaytime: boolean = true): string => {
  if (!shortForecast) return "🌤️";

  const forecast = shortForecast.toLowerCase();

  // Clear/Sunny conditions
  if (forecast.includes("sunny") || forecast.includes("clear")) {
    return isDaytime ? "☀️" : "🌙";
  }

  // Cloudy conditions
  if (forecast.includes("cloudy")) {
    if (forecast.includes("mostly cloudy")) {
      return isDaytime ? "⛅" : "☁️";
    }
    if (forecast.includes("partly cloudy")) {
      return isDaytime ? "⛅" : "☁️";
    }
    return "☁️";
  }

  // Rain conditions
  if (forecast.includes("rain")) {
    if (forecast.includes("light rain")) {
      return "🌦️";
    }
    if (forecast.includes("heavy rain")) {
      return "🌧️";
    }
    return "🌧️";
  }

  // Thunderstorm conditions
  if (forecast.includes("thunderstorm")) {
    return "⛈️";
  }

  // Snow conditions
  if (forecast.includes("snow")) {
    if (forecast.includes("light snow")) {
      return "🌨️";
    }
    if (forecast.includes("heavy snow")) {
      return "❄️";
    }
    return "🌨️";
  }

  // Mixed conditions
  if (forecast.includes("sleet") || forecast.includes("rain and snow")) {
    return "🌨️";
  }

  // Fog/Mist conditions
  if (forecast.includes("fog") || forecast.includes("mist")) {
    return "🌫️";
  }

  // Default
  return "🌤️";
};

export default { getWeatherIcon }; 