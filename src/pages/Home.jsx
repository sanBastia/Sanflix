import React from 'react';
import MovieList from '../modules/MovieList';

const Home = props => (
  <div>
    <MovieList {...props} />
  </div>
);

export default Home;
