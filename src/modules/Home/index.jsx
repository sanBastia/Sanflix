import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';
import logo from '../../logo.svg';
import requestHome from './action';

// eslint-disable-next-line
class App extends React.Component {

  componentDidMount() {
    this.props.requestHome();
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
          Welcome to React
          </h1>
        </header>
        <p className="App-intro">
                    To get started, edit
          {' '}
          <code>
          src/App.js
          </code>
          {' '}
          and save to reload.
        </p>
      </div>

    );
  }
}

const mapStateToProps = ({ homeReducer }) => ({
  homeReducer,
});

App.propTypes = {
  requestHome: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { requestHome })(App);
