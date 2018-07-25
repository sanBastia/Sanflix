import React from 'react';
import MovieList from '../modules/MovieList';
import Alert from '../modules/Alert';

const Home = props => (
  <div>
    <MovieList {...props} />
    <Alert />
  </div>
);

export default Home;
