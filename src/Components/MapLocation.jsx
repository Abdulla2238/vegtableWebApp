import React, { useEffect } from 'react';

const MapLocation = () => {
  const loadMap = () => {
    const loadGoogleMaps = (callback) => {
      if (!window.google) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLfclDl1nznJzYC0gVv6TH9cwQeL-dWJg&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', callback);
        document.head.appendChild(script);
      } else {
        callback();
      }
    };

    loadGoogleMaps(() => {
      // No need to define initMap here, it's a global function
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  // Define initMap outside the component
  window.initMap = () => {
    const google = window.google;
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 10,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
          });
        },
        () => {
          console.error('The Geolocation service failed.');
        }
      );
    } else {
      console.error('Your browser does not support geolocation.');
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MapLocation;
