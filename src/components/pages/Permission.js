import React from 'react';
import { Link } from 'react-router-dom';

const Permission = () => {
  return (
    <p>
      <h1>Please Connect the wallet first</h1>
      <Link to="/issue">Go to wallet Connection </Link>
    </p>
  );
};

export default Permission;