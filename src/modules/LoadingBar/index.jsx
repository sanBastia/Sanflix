import React from 'react';
import PropTypes from 'prop-types';
import SimpleLoadingBar from 'react-simple-loading-bar';

import './style.css';

const LoadingBar = (props) => {
  const { progress } = props;
  return (
    <React.Fragment>
      <SimpleLoadingBar activeRequests={progress} color="#28a745" />
    </React.Fragment>
  );
};

LoadingBar.defaultProps = {
  progress: 0,
};

LoadingBar.propTypes = {
  progress: PropTypes.number,
};


export default LoadingBar;
