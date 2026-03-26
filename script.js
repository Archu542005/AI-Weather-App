// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = 'b1b15e88fa797225412429c1c50c122a1'; // Demo key for testing
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadLastSearchedCity();
        this.loadFavoriteCities();
        this.initVoiceRecognition();
        this.currentCity = '';
    }

    cacheElements() {
        // Input and buttons
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');

        // Display elements
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');
        this.currentWeather = document.getElementById('currentWeather');
        this.aiSuggestions = document.getElementById('aiSuggestions');
        this.forecast = document.getElementById('forecast');
        this.favoriteCities = document.getElementById('favoriteCities');
        this.favoriteCitiesList = document.getElementById('favoriteCitiesList');

        // Weather data elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.feelsLike = document.getElementById('feelsLike');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
        this.suggestionsList = document.getElementById('suggestionsList');
        this.forecastCards = document.getElementById('forecastCards');

        // Navigation
        this.navBtns = document.querySelectorAll('.nav-btn');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.voiceBtn.addEventListener('click', () => this.startVoiceSearch());
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());

        // Navigation events
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });
    }

    async handleSearch() {
        let city = this.cityInput.value.trim();
        
        // Remove common punctuation and extra spaces
        city = city.replace(/[.,;:!?'"]/g, '').replace(/\s+/g, ' ').trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        await this.fetchWeatherData(city);
    }

    analyzeCityName(userInput) {
        const commonCities = {
            // Major cities with common misspellings
            'london': ['london', 'londan', 'londn', 'londonn'],
            'new york': ['new york', 'newyork', 'ny', 'nyc', 'new york city'],
            'paris': ['paris', 'pariss', 'pari', 'pairs'],
            'tokyo': ['tokyo', 'tokio', 'tokoyo', 'tokyi'],
            'mumbai': ['mumbai', 'bombay', 'mumbia', 'mumbi'],
            'delhi': ['delhi', 'delli', 'delhi', 'dilhi'],
            'bangalore': ['bangalore', 'bengaluru', 'bangalor', 'bengaluru'],
            'chennai': ['chennai', 'chenai', 'chenai', 'channai'],
            'kolkata': ['kolkata', 'culcutta', 'kolkatta', 'calcutta'],
            'hyderabad': ['hyderabad', 'hyderbad', 'hydrabad', 'hyderabaad'],
            'pune': ['pune', 'poona', 'pun', 'pune'],
            'ahmedabad': ['ahmedabad', 'ahmadabad', 'ahmedbad', 'ahmdabad'],
            'surat': ['surat', 'surat', 'suratt', 'surat'],
            'jaipur': ['jaipur', 'jaipure', 'jaipr', 'jaipur'],
            'lucknow': ['lucknow', 'lucknow', 'luknow', 'lucknow'],
            'kanpur': ['kanpur', 'kanpur', 'kanpur', 'kanpur'],
            'nagpur': ['nagpur', 'nagpur', 'nagpur', 'nagpur'],
            'indore': ['indore', 'indor', 'indore', 'indore'],
            'thane': ['thane', 'thane', 'thane', 'thane'],
            'bhopal': ['bhopal', 'bhopal', 'bhopal', 'bhopal'],
            'visakhapatnam': ['visakhapatnam', 'vizag', 'visakhapatnam', 'vizag'],
            'pimpri': ['pimpri', 'pimpri', 'pimri', 'pimpri'],
            'patna': ['patna', 'patna', 'patna', 'patna'],
            'vadodara': ['vadodara', 'baroda', 'vadodra', 'baroda'],
            'ghaziabad': ['ghaziabad', 'ghazibad', 'ghaziabad', 'ghazibad'],
            'ludhiana': ['ludhiana', 'ludhiana', 'ludhiana', 'ludhiana'],
            'agra': ['agra', 'agra', 'agra', 'agra'],
            'nashik': ['nashik', 'nashik', 'nashik', 'nashik'],
            'faridabad': ['faridabad', 'faridbad', 'faridabad', 'faridbad'],
            'meerut': ['meerut', 'meerut', 'meerut', 'meerut'],
            'rajkot': ['rajkot', 'rajkot', 'rajkot', 'rajkot'],
            'kalyan': ['kalyan', 'kalyan', 'kalyan', 'kalyan'],
            'vasai': ['vasai', 'vasai', 'vasai', 'vasai'],
            'solapur': ['solapur', 'solapur', 'solapur', 'solapur'],
            'aurangabad': ['aurangabad', 'aurangbad', 'aurangabad', 'aurangbad'],
            'mysore': ['mysore', 'mysuru', 'mysor', 'mysuru'],
            'noida': ['noida', 'noida', 'noida', 'noida'],
            'gurgaon': ['gurgaon', 'gurugram', 'gurgon', 'gurugram'],
            'coimbatore': ['coimbatore', 'coimbatore', 'coimbatore', 'coimbatore'],
            'kochi': ['kochi', 'cochin', 'kochi', 'cochin'],
            'thrissur': ['thrissur', 'trichur', 'thrissur', 'trichur'],
            'vijayawada': ['vijayawada', 'vijaywada', 'vijayavada', 'vijaywada'],
            'madurai': ['madurai', 'madurai', 'madurai', 'madurai'],
            'guwahati': ['guwahati', 'guwahati', 'guwahati', 'guwahati'],
            'chandigarh': ['chandigarh', 'chandigarh', 'chandigarh', 'chandigarh'],
            'hubli': ['hubli', 'hubli', 'hubli', 'hubli'],
            'dharwad': ['dharwad', 'dharwad', 'dharwad', 'dharwad'],
            'trivandrum': ['trivandrum', 'thiruvananthapuram', 'trivandrum', 'thiruvananthapuram']
        };

        const input = userInput.toLowerCase();
        
        // Check for exact matches first
        if (commonCities[input]) {
            return {
                original: userInput,
                suggested: input,
                confidence: 'high',
                message: `Found exact match for "${input}"`
            };
        }

        // Check for close matches using Levenshtein distance
        let bestMatch = null;
        let bestScore = Infinity;
        
        for (const [correctCity, variations] of Object.entries(commonCities)) {
            for (const variation of variations) {
                const distance = this.levenshteinDistance(input, variation);
                if (distance < bestScore && distance <= 2) { // Allow up to 2 character differences
                    bestScore = distance;
                    bestMatch = correctCity;
                }
            }
        }

        if (bestMatch) {
            return {
                original: userInput,
                suggested: bestMatch,
                confidence: bestScore === 0 ? 'high' : bestScore === 1 ? 'medium' : 'low',
                message: `Did you mean "${bestMatch}"?`
            };
        }

        // Check for partial matches
        for (const [correctCity, variations] of Object.entries(commonCities)) {
            for (const variation of variations) {
                if (variation.includes(input) || input.includes(variation)) {
                    return {
                        original: userInput,
                        suggested: correctCity,
                        confidence: 'low',
                        message: `Did you mean "${correctCity}"?`
                    };
                }
            }
        }

        return null;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    async fetchWeatherData(city) {
        this.showLoading();
        this.hideError();
        this.hideWeatherSections();

        try {
            // Fetch current weather
            const currentWeatherResponse = await fetch(
                `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
            );

            if (!currentWeatherResponse.ok) {
                // Analyze the city name for suggestions
                const analysis = this.analyzeCityName(city);
                
                if (analysis) {
                    this.showCitySuggestion(analysis);
                    return;
                } else {
                    throw new Error(`City "${city}" not found. Please check the spelling or try a different city.`);
                }
            }

            const currentWeatherData = await currentWeatherResponse.json();

            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
            );

            if (!forecastResponse.ok) {
                throw new Error('Forecast data not available');
            }

            const forecastData = await forecastResponse.json();

            // Display weather data
            this.displayCurrentWeather(currentWeatherData);
            this.displayForecast(forecastData);
            this.generateAISuggestions(currentWeatherData);
            
            // Save to localStorage
            this.saveLastSearchedCity(city);
            
            this.showWeatherSections();

        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    showCitySuggestion(analysis) {
        const suggestionMessage = `
            <div class="city-suggestion">
                <p><strong>${analysis.message}</strong></p>
                <p>You typed: "${analysis.original}"</p>
                <div class="suggestion-actions">
                    <button onclick="weatherApp.fetchWeatherData('${analysis.suggested}')" class="suggestion-btn">
                        Search for "${analysis.suggested}"
                    </button>
                    <button onclick="weatherApp.clearSuggestions()" class="cancel-btn">
                        Try different city
                    </button>
                </div>
            </div>
        `;
        
        // Create a custom suggestion display
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'city-suggestion-container';
        suggestionDiv.innerHTML = suggestionMessage;
        
        // Insert after search section
        const searchSection = document.querySelector('.search-section');
        searchSection.insertAdjacentHTML('afterend', suggestionDiv.outerHTML);
        
        this.hideLoading();
    }

    clearSuggestions() {
        const suggestionContainer = document.querySelector('.city-suggestion-container');
        if (suggestionContainer) {
            suggestionContainer.remove();
        }
        this.cityInput.value = '';
        this.cityInput.focus();
    }

    displayCurrentWeather(data) {
        this.currentCity = `${data.name}, ${data.sys.country}`;
        this.cityName.textContent = this.currentCity;
        this.currentDate.textContent = this.formatDate(new Date());
        this.temperature.textContent = `${Math.round(data.main.temp)}°`;
        this.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°`;
        this.weatherDescription.textContent = data.weather[0].description;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        
        // Set weather icon
        this.setWeatherIcon(data.weather[0].icon);
        
        // Set dynamic background based on weather
        this.setWeatherBackground(data.weather[0].main, data.weather[0].icon);
        
        // Update favorite button state
        this.updateFavoriteButton();
    }

    displayForecast(data) {
        this.forecastCards.innerHTML = '';
        
        // Get daily forecasts (one per day at noon)
        const dailyForecasts = this.processForecastData(data.list);
        
        dailyForecasts.forEach(day => {
            const forecastCard = this.createForecastCard(day);
            this.forecastCards.appendChild(forecastCard);
        });
    }

    processForecastData(forecastList) {
        const dailyData = {};
        
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            
            if (!dailyData[date] || new Date(item.dt * 1000).getHours() === 12) {
                dailyData[date] = item;
            }
        });
        
        return Object.values(dailyData).slice(0, 5);
    }

    createForecastCard(day) {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        card.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
                 alt="${day.weather[0].description}" class="forecast-icon">
            <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
            <div class="forecast-desc">${day.weather[0].description}</div>
            <div class="forecast-details">
                💧 ${day.main.humidity}% | 💨 ${day.wind.speed} m/s
            </div>
        `;
        
        return card;
    }

    generateAISuggestions(data) {
        const suggestions = [];
        const temp = data.main.temp;
        const weather = data.weather[0].main.toLowerCase();
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description.toLowerCase();

        // Temperature-based suggestions with emojis
        if (temp > 35) {
            suggestions.push({
                icon: '🥵',
                text: 'Extreme heat! Stay hydrated and avoid sun exposure.',
                priority: 'high'
            });
            suggestions.push({
                icon: '🧴',
                text: 'Apply SPF 50+ sunscreen - UV index is very high!',
                priority: 'high'
            });
            suggestions.push({
                icon: '🏠',
                text: 'Best to stay indoors during peak hours (11am-4pm).',
                priority: 'medium'
            });
        } else if (temp > 30) {
            suggestions.push({
                icon: '☀️',
                text: 'Hot weather! Drink plenty of water throughout the day.',
                priority: 'high'
            });
            suggestions.push({
                icon: '🧢',
                text: 'Wear light-colored clothes and a hat for sun protection.',
                priority: 'medium'
            });
        } else if (temp > 25) {
            suggestions.push({
                icon: '🌤️',
                text: 'Perfect weather for outdoor activities!',
                priority: 'medium'
            });
            suggestions.push({
                icon: '🚴',
                text: 'Great day for cycling or morning walks!',
                priority: 'low'
            });
        } else if (temp > 20) {
            suggestions.push({
                icon: '🌤️',
                text: 'Pleasant weather! Enjoy the outdoors.',
                priority: 'medium'
            });
        } else if (temp > 15) {
            suggestions.push({
                icon: '🧥',
                text: 'Light jacket recommended for comfort.',
                priority: 'medium'
            });
        } else if (temp > 10) {
            suggestions.push({
                icon: '🧣',
                text: 'Wear warm layers - it\'s quite chilly!',
                priority: 'high'
            });
            suggestions.push({
                icon: '☕',
                text: 'Perfect weather for hot beverages!',
                priority: 'low'
            });
        } else if (temp > 5) {
            suggestions.push({
                icon: '🧤',
                text: 'Very cold! Bundle up with gloves and scarf.',
                priority: 'high'
            });
            suggestions.push({
                icon: '🔥',
                text: 'Keep warm and consider indoor activities.',
                priority: 'medium'
            });
        } else {
            suggestions.push({
                icon: '❄️',
                text: 'Freezing temperatures! Stay warm and safe.',
                priority: 'high'
            });
            suggestions.push({
                icon: '⚠️',
                text: 'Risk of frostbite - limit outdoor exposure.',
                priority: 'high'
            });
        }

        // Weather condition-based suggestions with emojis
        if (weather.includes('rain') || description.includes('rain')) {
            suggestions.push({
                icon: '☔',
                text: 'Carry an umbrella - rain expected today!',
                priority: 'high'
            });
            suggestions.push({
                icon: '🚗',
                text: 'Drive carefully - roads may be slippery.',
                priority: 'high'
            });
            suggestions.push({
                icon: '👢',
                text: 'Waterproof boots recommended.',
                priority: 'medium'
            });
        } else if (weather.includes('snow') || description.includes('snow')) {
            suggestions.push({
                icon: '⛄',
                text: 'Snow expected! Wear waterproof warm clothing.',
                priority: 'high'
            });
            suggestions.push({
                icon: '🎿',
                text: 'Great conditions for winter sports!',
                priority: 'low'
            });
            suggestions.push({
                icon: '🏠',
                text: 'Stock up on essentials - snow may affect travel.',
                priority: 'medium'
            });
        } else if (weather.includes('thunderstorm') || description.includes('thunder')) {
            suggestions.push({
                icon: '⛈️',
                text: 'Thunderstorm warning! Stay indoors if possible.',
                priority: 'high'
            });
            suggestions.push({
                icon: '⚡',
                text: 'Unplug electronics to protect from surges.',
                priority: 'high'
            });
            suggestions.push({
                icon: '📱',
                text: 'Keep phones charged for emergency updates.',
                priority: 'medium'
            });
        } else if (weather.includes('cloud') || description.includes('cloud')) {
            if (description.includes('overcast')) {
                suggestions.push({
                    icon: '☁️',
                    text: 'Overcast skies - good for photography!',
                    priority: 'low'
                });
            } else {
                suggestions.push({
                    icon: '⛅',
                    text: 'Partly cloudy - comfortable weather expected.',
                    priority: 'low'
                });
            }
        } else if (weather.includes('clear') || description.includes('clear')) {
            suggestions.push({
                icon: '🌟',
                text: 'Clear skies perfect for stargazing tonight!',
                priority: 'low'
            });
            suggestions.push({
                icon: '📸',
                text: 'Great conditions for outdoor photography!',
                priority: 'low'
            });
        }

        // Humidity-based suggestions
        if (humidity > 85) {
            suggestions.push({
                icon: '�',
                text: 'Very humid - may feel warmer than actual temperature.',
                priority: 'medium'
            });
            suggestions.push({
                icon: '👕',
                text: 'Wear breathable fabrics to stay comfortable.',
                priority: 'low'
            });
        } else if (humidity < 30) {
            suggestions.push({
                icon: '🏜️',
                text: 'Very dry air - use moisturizer and stay hydrated.',
                priority: 'medium'
            });
        }

        // Wind-based suggestions
        if (windSpeed > 15) {
            suggestions.push({
                icon: '💨',
                text: 'Strong winds! Secure loose outdoor items.',
                priority: 'high'
            });
            suggestions.push({
                icon: '�',
                text: 'Be careful of falling branches in wooded areas.',
                priority: 'medium'
            });
        } else if (windSpeed > 8) {
            suggestions.push({
                icon: '🌬️',
                text: 'Breezy conditions - perfect for kite flying!',
                priority: 'low'
            });
        }

        // Special conditions
        if (description.includes('fog') || description.includes('mist')) {
            suggestions.push({
                icon: '🌫️',
                text: 'Low visibility - use fog lights when driving.',
                priority: 'high'
            });
        }

        if (description.includes('haze')) {
            suggestions.push({
                icon: '😷',
                text: 'Hazy conditions - consider wearing a mask outdoors.',
                priority: 'medium'
            });
        }

        // Sort by priority and limit to 4 suggestions
        suggestions.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        this.displaySuggestions(suggestions.slice(0, 4));
    }

    displaySuggestions(suggestions) {
        this.suggestionsList.innerHTML = '';
        
        suggestions.slice(0, 4).forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                <span class="suggestion-icon">${suggestion.icon}</span>
                <span class="suggestion-text">${suggestion.text}</span>
            `;
            this.suggestionsList.appendChild(suggestionItem);
        });
    }

    setWeatherIcon(iconCode) {
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        this.weatherIcon.alt = 'Weather icon';
    }

    setWeatherBackground(weatherMain, iconCode) {
        // Remove all weather classes
        document.body.className = '';
        
        // Hide all weather animations
        this.hideAllWeatherAnimations();
        
        // Determine background based on weather condition
        const weather = weatherMain.toLowerCase();
        const icon = iconCode.toLowerCase();
        
        if (icon.includes('n')) {
            // Night time
            document.body.classList.add('clear-night');
            this.activateNightAnimation();
        } else if (weather.includes('clear') || weather.includes('sun')) {
            document.body.classList.add('sunny');
            this.activateSunAnimation();
        } else if (weather.includes('cloud')) {
            document.body.classList.add('cloudy');
            this.activateCloudAnimation();
        } else if (weather.includes('rain') || weather.includes('drizzle')) {
            document.body.classList.add('rainy');
            this.activateRainAnimation();
        } else if (weather.includes('snow')) {
            document.body.classList.add('snowy');
            this.activateSnowAnimation();
        } else if (weather.includes('thunderstorm') || weather.includes('storm')) {
            document.body.classList.add('thunderstorm');
            this.activateThunderstormAnimation();
        } else {
            // Default to sunny for other conditions
            document.body.classList.add('sunny');
            this.activateSunAnimation();
        }
    }

    hideAllWeatherAnimations() {
        document.getElementById('rainAnimation').classList.remove('active');
        document.getElementById('sunAnimation').classList.remove('active');
        document.getElementById('cloudAnimation').classList.remove('active');
        document.getElementById('starsAnimation').classList.remove('active');
        document.getElementById('moon').style.display = 'none';
    }

    activateRainAnimation() {
        const rainAnimation = document.getElementById('rainAnimation');
        rainAnimation.classList.add('active');
        rainAnimation.innerHTML = '';
        
        // Create raindrops
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = Math.random() * 100 + '%';
            raindrop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            rainAnimation.appendChild(raindrop);
        }
    }

    activateSunAnimation() {
        document.getElementById('sunAnimation').classList.add('active');
    }

    activateCloudAnimation() {
        document.getElementById('cloudAnimation').classList.add('active');
    }

    activateNightAnimation() {
        const starsAnimation = document.getElementById('starsAnimation');
        starsAnimation.classList.add('active');
        starsAnimation.innerHTML = '';
        
        // Create stars
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsAnimation.appendChild(star);
        }
        
        document.getElementById('moon').style.display = 'block';
    }

    activateSnowAnimation() {
        const rainAnimation = document.getElementById('rainAnimation');
        rainAnimation.classList.add('active');
        rainAnimation.innerHTML = '';
        
        // Create snowflakes (using raindrop styling but white)
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'raindrop';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.background = 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8))';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';
            rainAnimation.appendChild(snowflake);
        }
    }

    activateThunderstormAnimation() {
        this.activateRainAnimation();
        // Add lightning effect
        setInterval(() => {
            if (document.body.classList.contains('thunderstorm')) {
                document.body.style.filter = 'brightness(1.5)';
                setTimeout(() => {
                    document.body.style.filter = 'brightness(1)';
                }, 100);
            }
        }, 5000);
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading();
        this.hideError();

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await this.fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                this.hideLoading();
                this.showError('Unable to retrieve your location. Please enable location services.');
            }
        );
    }

    async fetchWeatherByCoords(lat, lon) {
        try {
            // Fetch current weather
            const currentWeatherResponse = await fetch(
                `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );

            if (!currentWeatherResponse.ok) {
                throw new Error('Weather data not available');
            }

            const currentWeatherData = await currentWeatherResponse.json();

            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );

            if (!forecastResponse.ok) {
                throw new Error('Forecast data not available');
            }

            const forecastData = await forecastResponse.json();

            // Display weather data
            this.displayCurrentWeather(currentWeatherData);
            this.displayForecast(forecastData);
            this.generateAISuggestions(currentWeatherData);
            
            // Save to localStorage
            this.saveLastSearchedCity(currentWeatherData.name);
            
            this.showWeatherSections();

        } catch (error) {
            this.showError(error.message || 'Failed to fetch weather data');
        } finally {
            this.hideLoading();
        }
    }

    initVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.voiceBtn.style.display = 'none';
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.cityInput.value = transcript;
            this.handleSearch();
        };

        this.recognition.onerror = (event) => {
            this.showError('Voice recognition failed. Please try again.');
        };

        this.recognition.onend = () => {
            this.voiceBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        };
    }

    startVoiceSearch() {
        if (!this.recognition) {
            this.showError('Voice recognition is not supported');
            return;
        }

        this.voiceBtn.style.background = 'rgba(239, 68, 68, 0.3)';
        this.recognition.start();
    }

    // Utility methods
    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
    }

    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.hideWeatherSections();
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    showWeatherSections() {
        this.currentWeather.classList.remove('hidden');
        this.aiSuggestions.classList.remove('hidden');
        this.forecast.classList.remove('hidden');
    }

    hideWeatherSections() {
        this.currentWeather.classList.add('hidden');
        this.aiSuggestions.classList.add('hidden');
        this.forecast.classList.add('hidden');
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    saveLastSearchedCity(city) {
        localStorage.setItem('lastSearchedCity', city);
    }

    loadLastSearchedCity() {
        const lastCity = localStorage.getItem('lastSearchedCity');
        if (lastCity) {
            this.cityInput.value = lastCity;
            this.fetchWeatherData(lastCity);
        }
    }

    // Favorite Cities Functions
    loadFavoriteCities() {
        const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
        this.displayFavoriteCities(favorites);
    }

    toggleFavorite() {
        if (!this.currentCity) return;

        const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
        const cityKey = this.currentCity.toLowerCase();

        if (favorites.includes(cityKey)) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(city => city !== cityKey);
            localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
            this.displayFavoriteCities(updatedFavorites);
            this.showNotification('City removed from favorites ❤️');
        } else {
            // Add to favorites
            if (favorites.length >= 10) {
                this.showError('Maximum 10 favorite cities allowed');
                return;
            }
            favorites.push(cityKey);
            localStorage.setItem('favoriteCities', JSON.stringify(favorites));
            this.displayFavoriteCities(favorites);
            this.showNotification('City added to favorites ❤️');
        }

        this.updateFavoriteButton();
    }

    updateFavoriteButton() {
        if (!this.currentCity) return;

        const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
        const cityKey = this.currentCity.toLowerCase();

        if (favorites.includes(cityKey)) {
            this.favoriteBtn.classList.add('active');
            this.favoriteBtn.title = 'Remove from favorites';
        } else {
            this.favoriteBtn.classList.remove('active');
            this.favoriteBtn.title = 'Add to favorites';
        }
    }

    displayFavoriteCities(favorites) {
        this.favoriteCitiesList.innerHTML = '';

        if (favorites.length === 0) {
            this.favoriteCitiesList.innerHTML = `
                <div class="no-favorites">
                    <p>No favorite cities yet. Click the ❤️ button to add cities!</p>
                </div>
            `;
            return;
        }

        favorites.forEach(cityKey => {
            const cityCard = this.createFavoriteCityCard(cityKey);
            this.favoriteCitiesList.appendChild(cityCard);
        });
    }

    createFavoriteCityCard(cityKey) {
        const card = document.createElement('div');
        card.className = 'favorite-city-card';
        
        // Get cached weather data or show loading
        const cachedWeather = this.getCachedWeather(cityKey);
        
        if (cachedWeather) {
            card.innerHTML = `
                <button class="remove-favorite" onclick="weatherApp.removeFavorite('${cityKey}')">×</button>
                <div class="favorite-city-name">${cachedWeather.name}</div>
                <div class="favorite-city-temp">${Math.round(cachedWeather.temp)}°</div>
                <div class="favorite-city-desc">${cachedWeather.description}</div>
            `;
        } else {
            card.innerHTML = `
                <button class="remove-favorite" onclick="weatherApp.removeFavorite('${cityKey}')">×</button>
                <div class="favorite-city-name">${cityKey}</div>
                <div class="favorite-city-temp">--°</div>
                <div class="favorite-city-desc">Loading...</div>
            `;
            // Fetch weather data for this city
            this.fetchFavoriteCityWeather(cityKey, card);
        }

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-favorite')) {
                this.cityInput.value = cityKey;
                this.fetchWeatherData(cityKey);
            }
        });

        return card;
    }

    async fetchFavoriteCityWeather(cityKey, cardElement) {
        try {
            const response = await fetch(
                `${this.baseUrl}/weather?q=${cityKey}&appid=${this.apiKey}&units=metric`
            );

            if (response.ok) {
                const data = await response.json();
                this.cacheWeatherData(cityKey, data);
                
                // Update the card with weather data
                cardElement.innerHTML = `
                    <button class="remove-favorite" onclick="weatherApp.removeFavorite('${cityKey}')">×</button>
                    <div class="favorite-city-name">${data.name}, ${data.sys.country}</div>
                    <div class="favorite-city-temp">${Math.round(data.main.temp)}°</div>
                    <div class="favorite-city-desc">${data.weather[0].description}</div>
                `;
            }
        } catch (error) {
            console.error('Error fetching favorite city weather:', error);
        }
    }

    cacheWeatherData(cityKey, data) {
        const cache = JSON.parse(localStorage.getItem('weatherCache') || '{}');
        cache[cityKey] = {
            name: `${data.name}, ${data.sys.country}`,
            temp: data.main.temp,
            description: data.weather[0].description,
            timestamp: Date.now()
        };
        localStorage.setItem('weatherCache', JSON.stringify(cache));
    }

    getCachedWeather(cityKey) {
        const cache = JSON.parse(localStorage.getItem('weatherCache') || '{}');
        const cached = cache[cityKey];
        
        // Return cached data if it's less than 10 minutes old
        if (cached && (Date.now() - cached.timestamp) < 600000) {
            return cached;
        }
        return null;
    }

    removeFavorite(cityKey) {
        const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
        const updatedFavorites = favorites.filter(city => city !== cityKey);
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
        this.displayFavoriteCities(updatedFavorites);
        this.updateFavoriteButton();
        this.showNotification('City removed from favorites ❤️');
    }

    // Navigation Functions
    handleNavigation(e) {
        const section = e.currentTarget.dataset.section;
        
        // Update active state
        this.navBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Handle navigation actions
        switch(section) {
            case 'search':
                this.cityInput.focus();
                break;
            case 'favorites':
                this.favoriteCities.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'location':
                this.getCurrentLocation();
                break;
            case 'voice':
                this.startVoiceSearch();
                break;
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(34, 197, 94, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
let weatherApp;
document.addEventListener('DOMContentLoaded', () => {
    weatherApp = new WeatherApp();
});

// API Key Setup Instructions
/*
To get your OpenWeatherMap API key:
1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to the API keys section in your dashboard
4. Copy your API key
5. Replace 'YOUR_OPENWEATHERMAP_API_KEY' in the script.js file with your actual key

The free plan includes:
- Current weather data
- 5-day weather forecast
- 1,000 calls per day
- No credit card required
*/
