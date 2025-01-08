import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const searchData = new URLSearchParams(window.location.search);
  const message = searchData.get('message');
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Assuming '/' is the route for the Home page
  };

  return (
    <div>
      <div>Payment: {message}</div>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
}

export default Success;
