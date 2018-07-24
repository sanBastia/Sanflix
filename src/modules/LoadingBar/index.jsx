import React from 'react';
import PropTypes from 'prop-types';
import SimpleLoadingBar from 'react-simple-loading-bar';

import './style.css';

const LoadingBar = props => (
  <div className="LoadingBar">
    <SimpleLoadingBar activeRequests={props.progress} color=" #28a745" />
    <br />
    <span>
       Loading
    </span>
  </div>

);

LoadingBar.defaultProps = {
  progress: null,
};

LoadingBar.propTypes = {
  progress: PropTypes.number,
};


export default LoadingBar;
