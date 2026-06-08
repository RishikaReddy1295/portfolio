const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "0ff7aca919a20866423ddb5ede681e76";

searchBtn.addEventListener("click", async () => {

    const city = cityInput.value.trim();

    if (city === "") {

        weatherResult.innerHTML = `
            <p>Please enter a city name.</p>
        `;

        return;
    }

    try {

        weatherResult.innerHTML = `
            <p>Loading weather data...</p>
        `;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherResult.innerHTML = `

            <div class="weather-card">

                <h3>
                    ${data.name}, ${data.sys.country}
                </h3>

                <p>
                    🌡 Temperature:
                    ${data.main.temp} °C
                </p>

                <p>
                    💧 Humidity:
                    ${data.main.humidity}%
                </p>

                <p>
                    🌬 Wind Speed:
                    ${data.wind.speed} m/s
                </p>

                <p>
                    ☁ Weather:
                    ${data.weather[0].description}
                </p>

            </div>

        `;

    }

    catch (error) {

        weatherResult.innerHTML = `

            <p>
                Error: ${error.message}
            </p>

        `;

    }

});