import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';


// eslint-disable-next-line
class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default Routes;
