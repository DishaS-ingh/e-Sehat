import React, { useEffect, useState } from 'react';
import '../index.css';

const FindHospitals = () => {
  const [location, setLocation] = useState({ latitude: 13.028319560144325, longitude: 77.56983049066737 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set loading to false after setting location
    setLoading(false);
  }, []);

  const handleRedirect = () => {
    window.location.href = 'https://maps.app.goo.gl/sh2QFzJfbpJPfsEE6';
  };

  if (loading) {
    return <div className='loader'></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hospital Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <button onClick={handleRedirect} className="mt-4 p-2 bg-blue-500 text-white rounded">
        View on Google Maps
      </button>
    </div>
  );
};

export default FindHospitals;
