# 🌤️ AI Weather App

A modern, responsive weather web application with AI-powered smart suggestions, dynamic video backgrounds, and comprehensive weather data.

## ✨ Features

### 🌟 Core Features
- **City Search**: Search weather by city name with smart input sanitization
- **Current Weather**: Display temperature, humidity, wind speed, pressure, and visibility
- **5-Day Forecast**: Detailed weather forecast with interactive cards
- **Dynamic Backgrounds**: Video background with weather-responsive overlays
- **AI Smart Suggestions**: Intelligent recommendations based on weather conditions

### 🎯 Advanced Features
- **Voice Search**: Search cities using voice commands
- **Geolocation**: Auto-detect user's current location
- **Local Storage**: Remembers last searched city
- **Error Handling**: User-friendly error messages
- **Loading Animations**: Smooth loading states
- **Responsive Design**: Works perfectly on mobile and desktop

### 🎨 Design Features
- **Glassmorphism UI**: Modern frosted glass effect
- **Animated Gradients**: Dynamic color transitions
- **Weather Icons**: High-quality weather condition icons
- **Smooth Animations**: Hover effects and transitions

## 🚀 Live Demo

[Open the app in your browser](index.html)

## 📸 Screenshots

### Main Interface
- Clean, modern search interface with voice and location buttons
- Animated video background with weather overlays
- Glassmorphism cards for weather information

### Weather Display
- Current temperature with "feels like" indicator
- Detailed weather metrics (humidity, wind, pressure, visibility)
- Weather condition descriptions and icons

### AI Suggestions
- Smart recommendations based on weather:
  - "Stay hydrated!" for hot weather
  - "Carry an umbrella" for rain
  - "Wear warm clothes" for cold weather

### 5-Day Forecast
- Interactive forecast cards with daily weather
- Temperature ranges and weather conditions
- Humidity and wind speed indicators

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and modern structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Glassmorphism effects
  - Responsive design
- **Vanilla JavaScript**: No frameworks, pure JavaScript

### APIs & Services
- **OpenWeatherMap API**: Weather data and forecasts
- **Geolocation API**: User location detection
- **Web Speech API**: Voice recognition
- **LocalStorage**: Client-side data persistence

## 📋 Prerequisites

1. **API Key**: Get a free OpenWeatherMap API key
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Copy your API key from the dashboard

2. **Modern Browser**: Supports ES6+ features
   - Chrome 60+
   - Firefox 55+
   - Safari 12+
   - Edge 79+

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-weather-app.git
   cd ai-weather-app
   ```

2. **Add your API key**
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` with your OpenWeatherMap API key:
   ```javascript
   this.apiKey = 'your_actual_api_key_here';
   ```

3. **Add video background (optional)**
   - Place your video file in `assets/` folder
   - Name it `Video.mp4` or update the path in `index.html`

4. **Open the app**
   - Simply open `index.html` in your browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve -s . -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎮 Usage

### Basic Search
1. Type a city name in the search bar
2. Press Enter or click the search button
3. View current weather and 5-day forecast

### Voice Search
1. Click the microphone button
2. Speak the city name clearly
3. Weather data loads automatically

### Location Search
1. Click the location pin button
2. Allow browser to access your location
3. Weather data for your current location appears

### AI Suggestions
- Automatically generated based on current weather
- Provides helpful tips and recommendations
- Changes dynamically with weather conditions

## 🎨 Customization

### Colors & Themes
- Modify CSS variables in `style.css`
- Weather-specific background colors in `.video-overlay` classes
- Animation speeds in `@keyframes` sections

### Video Background
- Replace `assets/Video.mp4` with your own video
- Supported formats: MP4, WebM, OGG
- Recommended: 15-30 second loop, 1920x1080 resolution

### API Integration
- Change units: modify `&units=metric` to `&units=imperial` for Fahrenheit
- Add more weather data: extend API calls in `fetchWeatherData()`
- Custom weather icons: update OpenWeatherMap icon URLs

## 🌍 Weather Data

### Current Weather
- Temperature (°C/°F)
- "Feels like" temperature
- Weather description and condition
- Humidity percentage
- Wind speed (m/s or mph)
- Atmospheric pressure (hPa)
- Visibility distance (km/miles)

### 5-Day Forecast
- Daily weather predictions
- Temperature ranges
- Weather conditions
- Precipitation probability
- Wind and humidity data

### AI Suggestions Logic
- **Hot Weather** (>30°C): Hydration and sun protection tips
- **Cold Weather** (<10°C): Warm clothing recommendations
- **Rain**: Umbrella and driving safety advice
- **Snow**: Winter clothing and safety tips
- **Clear**: Outdoor activity suggestions

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Touch-friendly buttons
- Optimized font sizes
- Compact weather cards

### Tablet (768px - 1024px)
- Two-column layout for forecasts
- Medium-sized weather cards
- Balanced spacing

### Desktop (> 1024px)
- Full multi-column layout
- Large weather cards
- Maximum feature visibility

## 🔧 Troubleshooting

### Common Issues

**"City not found" Error**
- Check API key is valid and activated
- Verify city name spelling
- Ensure internet connection
- API keys can take 2 hours to activate

**Video Background Not Working**
- Check video file path in `index.html`
- Ensure video format is supported
- Verify file size (recommended < 100MB)

**Voice Search Not Available**
- Requires HTTPS or localhost
- Check browser microphone permissions
- Some browsers don't support speech recognition

**Geolocation Not Working**
- Enable location services in browser
- Check browser permissions
- Some networks block geolocation

### API Limits
- Free OpenWeatherMap plan: 1,000 calls/day
- Rate limited to 60 calls/minute
- Upgrade to paid plan for higher limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature description'`
5. Push: `git push origin feature-name`
6. Submit a Pull Request

### Contribution Ideas
- Add more weather metrics
- Implement weather maps
- Add weather alerts
- Support multiple languages
- Improve accessibility
- Add weather history

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather API
- [Google Fonts](https://fonts.google.com/) for Inter font family
- [Font Awesome](https://fontawesome.com/) for icons (if used)
- Weather icons from [OpenWeatherMap](https://openweathermap.org/weather-conditions)

## 📞 Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Portfolio**: [your-website.com](https://your-website.com)

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ and JavaScript**
