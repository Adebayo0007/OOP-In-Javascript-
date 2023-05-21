'use strict';

navigator.geolocation.getCurrentPosition(
  function (position) {
    // let map;
    // let cood1 = [];
    // console.log('success');
    const  {latitude} = position.coords;
    const  {longitude}  = position.coords;
    // console.log(latitude, longitude, position.coords.speed);
    // console.log(`https://www.google.com/maps/@${latitude}${longitude}`);
    var coordinate = [7.76667, 4.56667];
    // map.locate({setView:true, maxZoom:16});
    // map.on('locationfound', function(e){
    //   var lat = e.latlng.lat;
    //   var lng = e.latlng.lng;
    //   cood1.push(lat);
    //   cood1.push(lng);
    //   console.log();cood1
    // })
    var map = L.map('map').setView(coordinate, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(map);
    //these are for the location symbol
    L.marker(coordinate)
      .addTo(map)
      .bindPopup('Your location.<br> <span style="color:red">Work Out</span>')
      .openPopup();

    //customising some location when clicked
    map.on('click', function (mapEvent) {
      console.log(mapEvent);
      //focusing on the location
      const { lat, lng } = mapEvent.latlng;
      map.setView([lat, lng], 13,{
        animate:true,
        pan:{
          duratiion:1
        }
      })

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
  },
  function () {
    alert('your location cant be tracked');
  }
);


