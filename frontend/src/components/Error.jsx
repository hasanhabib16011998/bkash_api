import React from 'react';

function Error() {
  const searchData = new URLSearchParams(window.location.search);
  const message = searchData.get('message');

  return (
    <div>Payment: {message}</div>
  )
}

export default Error;