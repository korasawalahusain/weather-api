import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [citiesInput, setCitiesInput] = useState("");

  return (
    <>
      <section className="top-banner">
        <div className="container">
          <h1 className="heading">Simple Weather App</h1>
          <form
            onSubmit={(e) => {
              let cities;
              e.preventDefault();

              if (citiesInput.includes(",")) {
                cities = citiesInput.split(",").map((c) => c.trim());
              } else {
                cities = [citiesInput];
              }

              axios
                .post("http://localhost:4000/getWeather", {
                  cities,
                })
                .then((response) => {
                  console.log(response.data.data);
                  setWeatherData(response.data.data);
                });
            }}
          >
            <input
              type="text"
              placeholder="Search for a city"
              autoFocus
              value={citiesInput}
              onChange={(e) => setCitiesInput(e.target.value)}
            />
            <button type="submit">SUBMIT</button>
            <span className="msg"></span>
          </form>
        </div>
      </section>
      <section className="cities-section">
        <div className="container">
          <ul className="cities">
            {weatherData.length === 0
              ? null
              : weatherData.map((weather, index) => (
                  <div>
                    <h2 className="city-name">
                      <span>{weather.name}</span>
                      <sup>{weather.country}</sup>
                    </h2>
                    <div className="city-temp">
                      {Math.round(weather.temp)}
                      <sup>°C</sup>
                    </div>
                    <figure>
                      <img
                        className="city-icon"
                        src={weather.icon}
                        alt={weather.description}
                      />
                      <figcaption>{weather.description}</figcaption>
                    </figure>
                  </div>
                ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
