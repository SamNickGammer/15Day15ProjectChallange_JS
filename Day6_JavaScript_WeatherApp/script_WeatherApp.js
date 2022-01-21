let weather = {
  apiKey: 'd11b764461bfa67ce50ab55a276faf21',
  fetchWeatherName: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((responce) => responce.json())
      .then((data) => {
        if (data.cod == '200') {
          this.displeyWeather(data);
          document.querySelector('.errorShow').classList.add('displayNone');
          document.querySelector('.weather').classList.remove('displayNone');
        } else if (data.cod == '404') {
          this.displeyError(data);
          document.querySelector('.errorShow').classList.remove('displayNone');
          document.querySelector('.weather').classList.add('displayNone');
        }
      });
  },
  fetchWeatherLoc: function (latitude, longitude) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`
    )
      .then((responce) => responce.json())
      .then((data) => {
        if (data.cod == '200') {
          this.displeyWeather(data);
          document.querySelector('.errorShow').classList.add('displayNone');
          document.querySelector('.weather').classList.remove('displayNone');
        } else if (data.cod == '404') {
          this.displeyError(data);
          document.querySelector('.errorShow').classList.remove('displayNone');
          document.querySelector('.weather').classList.add('displayNone');
        }
      });
  },
  displeyWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = `Weather in ${name}`;
    document.querySelector('.icon').src =
      'http://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind Speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`;
  },
  search: function () {
    this.fetchWeatherName(document.querySelector('.search_bar').value);
  },
  displeyError: function (data) {
    const { message, cod } = data;
    document.querySelector('.message').innerText = message;
    document.querySelector('.errorCode').innerText = `</${cod}>`;
  },
  onError: function (error) {
    alert(error.message);
  },
  onSuccess: function (position) {
    const { latitude, longitude } = position.coords;
    weather.fetchWeatherLoc(latitude, longitude);
  },
};

document.querySelector('.searchBtn').addEventListener('click', function () {
  weather.search();
});

document
  .querySelector('.search_bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

document.querySelector('.locationBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      weather.onSuccess,
      weather.onError
    );
  } else {
    alert('Your Browser not support Geolocation API');
  }
});

weather.fetchWeatherName('Aurangābād');
