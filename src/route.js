import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Navigation from './modules/Navigation';


// eslint-disable-next-line
class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:movie" component={Detail} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default Routes;
