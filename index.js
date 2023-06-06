const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weatherbox = document.querySelector('.weatherbox');
const weatherdetails = document.querySelector('.weatherdetails');
const error404 = document.querySelector('.notfound');

search.addEventListener('click', () => {
  const APIKey = '101c15ba42692c59fd2a9035cd9d4d69';
  const city = document.querySelector('.search input').value;

  if (city === '') {
    return;
  }

  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') {
        container.style.height = '430px';
        weatherbox.style.display = 'none';
        weatherdetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weatherbox img');
      const temperature = document.querySelector('.weatherbox .temperature');
      const description = document.querySelector('.weatherbox .description');
      const humidity = document.querySelector('.weatherdetails .humidity span');
      const wind = document.querySelector('.weatherdetails .wind span');

      const weather = json.list[0].weather[0];

      switch (weather.main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;

        case 'Rain':
          image.src = 'images/rain.png';
          break;

        case 'Mist':
          image.src = 'images/mist.png';
          break;

        case 'Snow':
          image.src = 'images/snow.png';
          break;

        case 'Clouds':
          image.src = 'images/cloud.png';
          break;

        case 'Fog':
          image.src = 'images/fog.png';
          break;

        default:
          image.src = '';
      }

      const temperatureValue = Math.round(json.list[0].main.temp - 273.15); // Convert from Kelvin to Celsius

      temperature.innerHTML = `${temperatureValue}<span>°C</span>`;
      description.innerHTML = `${weather.description}`;
      humidity.innerHTML = `${json.list[0].main.humidity}%`;
      wind.innerHTML = `${parseInt(json.list[0].wind.speed)}Km/h`;

      weatherbox.style.display = '';
      weatherdetails.style.display = '';
      weatherbox.classList.add('fadeIn');
      weatherdetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
});
