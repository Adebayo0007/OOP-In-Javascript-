'use strict';
let body = document.querySelector('#body');
let countryTable = document.querySelector('#countries');
let search = document.querySelector('.search-search');
let button = document.querySelector('#completed-task');

// asyncroneous programing using XMLHttpRequest
const displayCountryUsingXMLHttpRequest = function () {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v2/name/${search.value.toLowerCase()}`
  );
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    countryTable.innerHTML = '';
    diaplayCountry(data, 'Neighbouring country');

    //rendering the neighbour country
    const neighbour = data.borders[0];
    console.log(neighbour);
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      console.log(this.responseText);
      const data1 = JSON.parse(this.responseText);
      // console.log(data1);
      diaplayCountry(data1);
      console.log(data.latlng);
      var map = L.map('map').setView(data.latlng, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(map);
      //these are for the location symbol
      L.marker(data.latlng)
        .addTo(map)
        .bindPopup('Your location.<br> <span style="color:red">Work Out</span>')
        .openPopup();
      //customizing ur location symbol
      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              minWidth: 250,
              maxWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'popupStyle',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    });
  });
};

//asyncroneous programing using fetch helping method
const displayCountryUsingFetchRequest = function () {
  fetch(`https://restcountries.com/v2/name/${search.value.toLowerCase()}`)
    .then(
      (promise) =>
        function () {
          if (!promise.ok)
            throw new Error(`response cant be found ${promise.status}`);
          return promise.json();
        }
    )
    .then(
      (response) =>
        function () {
          if (!response) throw new Error('response cant be found');
          console.log(response);
          diaplayCountry(response);
        }
    )
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      // body.style.backgroundColor =
      // body.style.backgroundColor === 'red' ? 'white' : 'red';
      body.style.opacity = body.style.backgroundColor === 'red' ? 0 : 1;
    });
};

//asyncroneous programing inside asyncroneous programing using fetch helping method
//#example1

const displayCountryUsingFetchRequest1 = function () {
  fetch(`https://restcountries.com/v2/name/${search.value.toLowerCase()}`)
    .then(
      (promise) =>
        function () {
          if (!promise.ok)
            throw new Error(`response cant be found ${promise.status}`);
          return promise.json();
        }
    )
    .then(
      (response) =>
        function () {
          if (!response) throw new Error(`response cant be found`);
          console.log(response);

          //this can be any other AJAX requst you want to execute immediately after the first asyncroneous process
          return fetch(
            `https://restcountries.com/v2/name/${search.value.toLowerCase()}`
          );
        }
    )
    .then(
      (pro) =>
        function () {
          if (!pro.ok) throw new Error(`response cant be found ${pro.status}`);
        }
    )
    .then(
      (data) =>
        function () {
          if (!data) throw new Error(`response cant be found`);
          console.log(data);
        }
    )
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      body.style.opacity = body.style.backgroundColor === 'red' ? 0 : 1;
    });
};

//#example2 by creating a promise from Geolocation APi
const displayCountryUsingFetchRequest2 = function () {
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const whereAmI = function () {
    getPosition()
      .then((data) => {
        console.log(`Your data ${data}`);
        const { latitude = lat, longitude = lng } = data.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
      .then((promise) => {
        if (!promise.ok)
          throw new Error(`cant get your location ${promise.status}`);
        return promise.json();
      })
      .then((result) => {
        console.log(result);
        console.log(`You are in ${result.city}, ${result.country}`);

        return fetch(`https://restcountries.eu/rest/v2/name/${result.country}`);
      })
      .then((promise) => {
        if (!promise.ok)
          throw new Error(`Your country can't be found ${promise.status}`);
        return promise.json();
      })
      .then((response) => {
        console.log(response);
        diaplayCountry(response);
      })
      .catch((err) => console.log(`${err.message} ❌`))
      .finally(() => {
        body.style.opacity = body.style.backgroundColor === 'red' ? 0 : 1;
      });
  };
};
//function for displaying country
const diaplayCountry = function (countryData, neighbour = '') {
  countryTable.innerHTML += `<div>
  <div id="country-image"><img src="${countryData.flag}" alt="flag" /></div>
  <div id="country-details">
    <span id="country-name">${countryData.name}</span>
    <div><span id="country-region">${countryData.capital}</span></div>
    <div><span id="country-region">👩🏼‍🤝‍🧑🏻</span><span>${(
      countryData.population / 1000000
    ).toFixed(1)} people</span></div>
    <div><span>📢</span><span>${countryData.languages[0].name}</span></div>
    <div><span>💰</span><span>${countryData.currencies[0].name}</span></div>
    <div><span>📳</span><span>${countryData.callingCodes[0]}</span></div>
    <div><span>🚩</span><span>${countryData.region}</span></div>
    <div><span>Sub 🚩</span><span>${countryData.subregion}</span></div>
    <div><span>🕔</span><span>${countryData.timezones[0]}</span></div>
  </div>
</div><span>${neighbour}</span>`;
};
// you can generate with the generate button
document.querySelector('#btn').addEventListener('click', () => {
  // countryTable.innerHTML ='';
  displayCountryUsingXMLHttpRequest();
  // whereAmI();
  search.value = '';
});
// you can generate with the search button
button.addEventListener('click', () => {
  // countryTable.innerHTML ='';
  displayCountryUsingXMLHttpRequest();
  // whereAmI();
  search.value = '';
});

// you can generate by pressing enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // countryTable.innerHTML ='';
    e.preventDefault();
    displayCountryUsingXMLHttpRequest();
    // whereAmI();
    search.value = '';
  }
});

//personal testing

document.addEventListener('keydown', (e) => {
  if (e.key === 'Control') {
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'c') {
        // localStorage.setItem('addressKey', )
        console.log('its control C');
      }
    });
  }
});
