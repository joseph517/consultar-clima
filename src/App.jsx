import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // Obtener API key de OpenWeatherMap en https://openweathermap.org/api
  const API_KEY = "TU_API_KEY_AQUI"; // Reemplazar con tu API key

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Obtener sugerencias de ciudades
  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmedCity = city.trim();

      if (trimmedCity.length >= 4) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${trimmedCity}&limit=5&appid=${API_KEY}`
          );

          if (response.ok) {
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(data.length > 0);
          }
        } catch (err) {
          console.error("Error al obtener sugerencias:", err);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [city, API_KEY]);

  const searchWeather = async (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Por favor ingresa una ciudad");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    setShowSuggestions(false);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(""); // Limpiar el input después de buscar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setCity(cityName);
    setShowSuggestions(false);
    // Buscar automáticamente al seleccionar una sugerencia
    setTimeout(() => {
      document.querySelector('.search-button')?.click();
    }, 100);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setError(""); // Limpiar error al escribir
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Consultar Clima</h1>
        <p className="subtitle">Obtén información del clima en tiempo real</p>
      </header>

      <main className="main-content">
        <div ref={suggestionsRef} style={{ width: '100%', maxWidth: '600px' }}>
          <form onSubmit={searchWeather} className="search-form">
            <input
              type="text"
              placeholder="Ingresa una ciudad..."
              value={city}
              onChange={handleInputChange}
              className="search-input"
              autoComplete="off"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                  {suggestion.state && `, ${suggestion.state}`}
                  {`, ${suggestion.country}`}
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {weatherData && (
          <div className="weather-container">
            <div className="weather-header">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                />
              </div>
              <p className="weather-description">
                {weatherData.weather[0].description}
              </p>
            </div>

            <div className="temperature-main">
              <div className="temp-value">{Math.round(weatherData.main.temp)}°C</div>
              <div className="feels-like">
                Sensación térmica: {Math.round(weatherData.main.feels_like)}°C
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-card">
                <div className="detail-icon">🌡️</div>
                <div className="detail-info">
                  <span className="detail-label">Temp. Mín/Máx</span>
                  <span className="detail-value">
                    {Math.round(weatherData.main.temp_min)}°C / {Math.round(weatherData.main.temp_max)}°C
                  </span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">💧</div>
                <div className="detail-info">
                  <span className="detail-label">Humedad</span>
                  <span className="detail-value">{weatherData.main.humidity}%</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">💨</div>
                <div className="detail-info">
                  <span className="detail-label">Viento</span>
                  <span className="detail-value">{weatherData.wind.speed} m/s</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🔽</div>
                <div className="detail-info">
                  <span className="detail-label">Presión</span>
                  <span className="detail-value">{weatherData.main.pressure} hPa</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">👁️</div>
                <div className="detail-info">
                  <span className="detail-label">Visibilidad</span>
                  <span className="detail-value">{(weatherData.visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">☁️</div>
                <div className="detail-info">
                  <span className="detail-label">Nubosidad</span>
                  <span className="detail-value">{weatherData.clouds.all}%</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🌅</div>
                <div className="detail-info">
                  <span className="detail-label">Amanecer</span>
                  <span className="detail-value">{formatTime(weatherData.sys.sunrise)}</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🌇</div>
                <div className="detail-info">
                  <span className="detail-label">Atardecer</span>
                  <span className="detail-value">{formatTime(weatherData.sys.sunset)}</span>
                </div>
              </div>
            </div>

            <div className="coordinates">
              <small>
                Coordenadas: {weatherData.coord.lat}°, {weatherData.coord.lon}°
              </small>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
