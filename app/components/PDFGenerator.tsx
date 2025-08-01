import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useShabbos } from '../context/shabbosContext';
import { extractCandleItems } from '../utils/candleDataUtils';
import { getWeatherIcon } from '../utils/weatherIconMapping';

interface PDFGeneratorProps {
  forecastType: 'daily' | 'hourly';
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ forecastType }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
    weatherLoading,
    candleData,
    geoData,
    candleLoading,
  } = useShabbos();

  const { friday: fridayPeriods, saturday: saturdayPeriods } = getShabbosForecasts(candleData || { items: [] });
  const { friday: fridaySummary, saturday: saturdaySummary } = getShabbosDailySummaries(candleData || { items: [] });
  const { friday: fridayHourly, saturday: saturdayHourly } = getShabbosHourlyForecasts(candleData || { items: [] });

  const isLoading = weatherLoading || candleLoading;
  const hasData = fridayPeriods && saturdayPeriods && fridayPeriods.length > 0 && saturdayPeriods.length > 0 && candleData && geoData;

  const generatePDF = async () => {
    if (!hasData) {
      Alert.alert('No Data', 'No weather or candle data available for PDF generation.');
      return;
    }

    setIsGenerating(true);

    try {
      const { candleItem, parshahItem, havdalahItem } = extractCandleItems(candleData || { items: [] });
      const parshahEnglish = parshahItem ? 'Parshas ' + parshahItem.title.split(' ')[1] : 'Unknown Parshah';

      // Create HTML content matching the web app's design
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Shabbos Weather & Times</title>
          <style>
            body { 
              font-family: Helvetica, Arial, sans-serif; 
              margin: 0; 
              padding: 24px; 
              background-color: #f5f6fa;
              color: #333333;
            }
            .page {
              max-width: 800px;
              margin: 0 auto;
              background-color: #f5f6fa;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding: 0;
              width: 100%;
            }
            .parshah-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 4px;
              color: #333333;
            }
            .hebrew-text {
              font-family: Arial, sans-serif;
            }
            .hdate {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .location {
              font-size: 14px;
              text-align: center;
              color: #333333;
            }
            .section {
              margin: 0;
              margin-bottom: 8px;
              padding: 0;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .candle-section {
              border: 1px solid #e0e0e0;
              border-radius: 10px;
              padding: 12px;
              margin-bottom: 12px;
              background-color: #fffbe6;
              width: 90%;
              max-width: 420px;
              align-self: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            }
            .candle-title {
              font-size: 13px;
              font-weight: bold;
              margin-bottom: 2px;
              color: #8b4513;
            }
            .candle-info {
              font-size: 9px;
              font-weight: 700;
              margin-bottom: 2px;
              color: #555555;
              padding-left: 8px;
            }
            .card {
              border: 1px solid #e0e0e0;
              border-radius: 10px;
              padding: 12px;
              margin-bottom: 8px;
              background-color: #ffffff;
              width: 90%;
              max-width: 420px;
              align-self: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            }
            .day-title {
              font-size: 13px;
              font-weight: bold;
              margin-bottom: 2px;
              color: #2c3e50;
              text-align: center;
            }
            .summary-container {
              margin-top: 8px;
              padding: 8px;
              background-color: #f8f9fa;
              border-radius: 6px;
              border: 1px solid #e9ecef;
            }
            .summary-main-row {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 6px;
            }
            .summary-left {
              flex: 2;
              margin-right: 12px;
            }
            .summary-right {
              flex: 1;
              text-align: right;
            }
            .summary-temp {
              font-size: 16px;
              font-weight: bold;
              color: #e74c3c;
              margin-bottom: 2px;
            }
            .summary-condition {
              font-size: 10px;
              color: #495057;
              font-style: italic;
              line-height: 1.2;
            }
            .weather-detail {
              text-align: right;
              margin-bottom: 4px;
            }
            .detail-label {
              font-size: 8px;
              color: #6c757d;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 1px;
            }
            .detail-value {
              font-size: 9px;
              color: #495057;
              font-weight: bold;
            }
            .temp-table-row {
              display: flex;
              justify-content: space-between;
              margin-top: 4px;
              margin-bottom: 2px;
            }
            .temp-table-col {
              flex: 1;
              text-align: center;
            }
            .temp-period-label {
              font-size: 10px;
              color: #555;
              font-weight: normal;
              margin-bottom: 1px;
            }
            .temp-period-value {
              font-size: 14px;
              color: #000000;
              font-weight: bold;
              margin-bottom: 0;
            }
            .feels-like-temp {
              font-size: 8px;
              color: #b0b0b0;
              font-style: italic;
              margin-top: 0;
              margin-bottom: 0;
            }
            .hourly-table-header {
              display: flex;
              background-color: #f8f9fa;
              border-bottom: 1px solid #dee2e6;
              padding: 4px 0;
              margin-bottom: 2px;
            }
            .hourly-header-cell {
              flex: 1;
              font-size: 8px;
              font-weight: bold;
              color: #495057;
              text-align: center;
              padding: 0 2px;
            }
            .hourly-table-row {
              display: flex;
              border-bottom: 1px solid #f1f3f4;
              padding: 3px 0;
              align-items: center;
            }
            .hourly-cell {
              flex: 1;
              font-size: 7px;
              color: #495057;
              text-align: center;
              padding: 0 2px;
            }
            .weather-icon {
              font-size: 12px;
              margin-right: 2px;
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
              <div class="parshah-title">
                ${parshahEnglish}
                <span class="hebrew-text">${parshahItem?.hebrew || ''}</span>
              </div>
              ${parshahItem?.hdate ? `<div class="hdate">${parshahItem.hdate}</div>` : ''}
              <div class="location">${geoData?.city}, ${geoData?.region}</div>
            </div>
            
            <div class="section">
              <!-- Candle Times Section -->
              <div class="candle-section">
                ${candleItem ? `
                  <div>
                    <div class="candle-title">
                      Candle Lighting ${new Date(candleItem.date).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div class="candle-info">
                      ${new Date(candleItem.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                ` : ''}
                ${havdalahItem ? `
                  <div>
                    <div class="candle-title">
                      Havdalah ${new Date(havdalahItem.date).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div class="candle-info">
                      ${new Date(havdalahItem.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                ` : ''}
              </div>

              <!-- Weather Forecast Section -->
              ${forecastType === 'daily' ? `
                <!-- Friday Card -->
                ${fridayPeriods && fridayPeriods.length > 0 ? `
                  <div class="card">
                    <div class="day-title">Friday</div>
                    
                    ${fridaySummary && fridaySummary.temperature ? `
                      <div class="summary-container">
                        <div class="summary-main-row">
                          <div class="summary-left">
                            <div class="summary-temp">
                              ${getWeatherIcon(fridaySummary.shortForecast, fridaySummary.isDaytime)} ${fridaySummary.temperature}°${fridaySummary.temperatureUnit || 'F'}
                            </div>
                            <div class="summary-condition">
                              ${fridaySummary.shortForecast || 'No forecast available'}
                            </div>
                          </div>
                          <div class="summary-right">
                            ${fridaySummary.windSpeed ? `
                              <div class="weather-detail">
                                <div class="detail-label">Wind</div>
                                <div class="detail-value">${fridaySummary.windSpeed} ${fridaySummary.windDirection || ''}</div>
                              </div>
                            ` : ''}
                            ${fridaySummary.probabilityOfPrecipitation && fridaySummary.probabilityOfPrecipitation.value ? `
                              <div class="weather-detail">
                                <div class="detail-label">Precipitation</div>
                                <div class="detail-value">${fridaySummary.probabilityOfPrecipitation.value}%</div>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    ` : ''}
                    
                    <div class="temp-table-row">
                      ${fridayPeriods.map(period => period && period.temperature ? `
                        <div class="temp-table-col">
                          <div class="temp-period-label">${getTimeLabel(period, 'Friday')}</div>
                          <div class="temp-period-value">
                            ${getWeatherIcon(period.shortForecast, period.isDaytime)} ${period.temperature}°${period.temperatureUnit || 'F'}
                          </div>
                          <div class="feels-like-temp">${period.shortForecast || 'No forecast'}</div>
                        </div>
                      ` : '').join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Saturday Card -->
                ${saturdayPeriods && saturdayPeriods.length > 0 ? `
                  <div class="card">
                    <div class="day-title">Saturday</div>
                    
                    ${saturdaySummary && saturdaySummary.temperature ? `
                      <div class="summary-container">
                        <div class="summary-main-row">
                          <div class="summary-left">
                            <div class="summary-temp">
                              ${getWeatherIcon(saturdaySummary.shortForecast, saturdaySummary.isDaytime)} ${saturdaySummary.temperature}°${saturdaySummary.temperatureUnit || 'F'}
                            </div>
                            <div class="summary-condition">
                              ${saturdaySummary.shortForecast || 'No forecast available'}
                            </div>
                          </div>
                          <div class="summary-right">
                            ${saturdaySummary.windSpeed ? `
                              <div class="weather-detail">
                                <div class="detail-label">Wind</div>
                                <div class="detail-value">${saturdaySummary.windSpeed} ${saturdaySummary.windDirection || ''}</div>
                              </div>
                            ` : ''}
                            ${saturdaySummary.probabilityOfPrecipitation && saturdaySummary.probabilityOfPrecipitation.value ? `
                              <div class="weather-detail">
                                <div class="detail-label">Precipitation</div>
                                <div class="detail-value">${saturdaySummary.probabilityOfPrecipitation.value}%</div>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    ` : ''}
                    
                    <div class="temp-table-row">
                      ${saturdayPeriods.map(period => period && period.temperature ? `
                        <div class="temp-table-col">
                          <div class="temp-period-label">${getTimeLabel(period, 'Saturday')}</div>
                          <div class="temp-period-value">
                            ${getWeatherIcon(period.shortForecast, period.isDaytime)} ${period.temperature}°${period.temperatureUnit || 'F'}
                          </div>
                          <div class="feels-like-temp">${period.shortForecast || 'No forecast'}</div>
                        </div>
                      ` : '').join('')}
                    </div>
                  </div>
                ` : ''}
              ` : `
                <!-- Hourly Forecast Section -->
                <!-- Friday Hourly -->
                ${fridayHourly && fridayHourly.length > 0 ? `
                  <div class="card">
                    <div class="day-title">Friday Hourly Forecast</div>
                    
                    ${fridaySummary && fridaySummary.temperature ? `
                      <div class="summary-container">
                        <div class="summary-main-row">
                          <div class="summary-left">
                            <div class="summary-temp">
                              ${getWeatherIcon(fridaySummary.shortForecast, fridaySummary.isDaytime)} ${fridaySummary.temperature}°${fridaySummary.temperatureUnit || 'F'}
                            </div>
                          </div>
                          <div class="summary-right">
                            ${fridaySummary.windSpeed ? `
                              <div class="weather-detail">
                                <div class="detail-label">Wind</div>
                                <div class="detail-value">${fridaySummary.windSpeed} ${fridaySummary.windDirection || ''}</div>
                              </div>
                            ` : ''}
                            ${fridaySummary.probabilityOfPrecipitation && fridaySummary.probabilityOfPrecipitation.value ? `
                              <div class="weather-detail">
                                <div class="detail-label">Precipitation</div>
                                <div class="detail-value">${fridaySummary.probabilityOfPrecipitation.value}%</div>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    ` : ''}
                    
                    <div class="hourly-table-header">
                      <div class="hourly-header-cell">Time</div>
                      <div class="hourly-header-cell">Temp</div>
                      <div class="hourly-header-cell">Weather</div>
                      <div class="hourly-header-cell">Precip</div>
                      <div class="hourly-header-cell">Wind</div>
                    </div>
                    
                    ${fridayHourly.map(hour => hour ? `
                      <div class="hourly-table-row">
                        <div class="hourly-cell">${formatHourlyTime(hour.startTime)}</div>
                        <div class="hourly-cell">${hour.temperature}°${hour.temperatureUnit}</div>
                        <div class="hourly-cell">
                          <span class="weather-icon">${getWeatherIcon(hour.shortForecast, hour.isDaytime)}</span>
                          ${hour.shortForecast || 'N/A'}
                        </div>
                        <div class="hourly-cell">${hour.probabilityOfPrecipitation?.value !== null ? hour.probabilityOfPrecipitation.value + '%' : '0%'}</div>
                        <div class="hourly-cell">${hour.windSpeed && hour.windDirection ? hour.windDirection + ' ' + hour.windSpeed : 'N/A'}</div>
                      </div>
                    ` : '').join('')}
                  </div>
                ` : ''}

                <!-- Saturday Hourly -->
                ${saturdayHourly && saturdayHourly.length > 0 ? `
                  <div class="card">
                    <div class="day-title">Saturday Hourly Forecast</div>
                    
                    ${saturdaySummary && saturdaySummary.temperature ? `
                      <div class="summary-container">
                        <div class="summary-main-row">
                          <div class="summary-left">
                            <div class="summary-temp">
                              ${getWeatherIcon(saturdaySummary.shortForecast, saturdaySummary.isDaytime)} ${saturdaySummary.temperature}°${saturdaySummary.temperatureUnit || 'F'}
                            </div>
                          </div>
                          <div class="summary-right">
                            ${saturdaySummary.windSpeed ? `
                              <div class="weather-detail">
                                <div class="detail-label">Wind</div>
                                <div class="detail-value">${saturdaySummary.windSpeed} ${saturdaySummary.windDirection || ''}</div>
                              </div>
                            ` : ''}
                            ${saturdaySummary.probabilityOfPrecipitation && saturdaySummary.probabilityOfPrecipitation.value ? `
                              <div class="weather-detail">
                                <div class="detail-label">Precipitation</div>
                                <div class="detail-value">${saturdaySummary.probabilityOfPrecipitation.value}%</div>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    ` : ''}
                    
                    <div class="hourly-table-header">
                      <div class="hourly-header-cell">Time</div>
                      <div class="hourly-header-cell">Temp</div>
                      <div class="hourly-header-cell">Weather</div>
                      <div class="hourly-header-cell">Precip</div>
                      <div class="hourly-header-cell">Wind</div>
                    </div>
                    
                    ${saturdayHourly.map(hour => hour ? `
                      <div class="hourly-table-row">
                        <div class="hourly-cell">${formatHourlyTime(hour.startTime)}</div>
                        <div class="hourly-cell">${hour.temperature}°${hour.temperatureUnit}</div>
                        <div class="hourly-cell">
                          <span class="weather-icon">${getWeatherIcon(hour.shortForecast, hour.isDaytime)}</span>
                          ${hour.shortForecast || 'N/A'}
                        </div>
                        <div class="hourly-cell">${hour.probabilityOfPrecipitation?.value !== null ? hour.probabilityOfPrecipitation.value + '%' : '0%'}</div>
                        <div class="hourly-cell">${hour.windSpeed && hour.windDirection ? hour.windDirection + ' ' + hour.windSpeed : 'N/A'}</div>
                      </div>
                    ` : '').join('')}
                  </div>
                ` : ''}
              `}
            </div>
          </div>
        </body>
        </html>
      `;

      // Generate PDF using expo-print
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });
      
      // Share the PDF using expo-sharing
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Shabbos Weather Report',
          UTI: 'com.adobe.pdf'
        });
        
        Alert.alert('Success', 'PDF generated and shared successfully!');
      } else {
        Alert.alert('Sharing not available', 'PDF was generated but sharing is not available on this device.');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getTimeLabel = (period: any, dayLabel: string) => {
    if (dayLabel === 'Friday') {
      const hour = new Date(period.startTime).getHours();
      if (hour === 16) return 'Afternoon 4pm';
      if (hour === 20) return 'Evening 8pm';
      if (hour === 0) return 'Night 12am';
    } else if (dayLabel === 'Saturday') {
      const hour = new Date(period.startTime).getHours();
      if (hour === 8) return 'Morning 8am';
      if (hour === 12) return 'Day 12pm';
      if (hour === 16) return 'Afternoon 4pm';
      if (hour === 20) return 'Evening 8pm';
    }
    return period.name || '';
  };

  const formatHourlyTime = (startTime: string) => {
    const date = new Date(startTime);
    return date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      })
      .replace(':00', '')
      .toLowerCase();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
          <Text style={styles.buttonText}>Loading data for PDF...</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!hasData) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
          <Text style={styles.buttonText}>No data available for PDF</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isGenerating && styles.disabledButton]}
        onPress={generatePDF}
        disabled={isGenerating}
      >
        <Text style={styles.buttonText}>
          {isGenerating ? '🔄 Generating PDF...' : '🖨️ Generate & Share PDF'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    } : {
      // No shadows on Android
    }),
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PDFGenerator; 