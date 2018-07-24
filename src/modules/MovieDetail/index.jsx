import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import requestMovieDetail from './action';
import LoadingBar from '../LoadingBar';


// eslint-disable-next-line
class MovieDetail extends Component {

  static propTypes = {
    requestMovieDetail: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    movieDetailReducer: PropTypes.object.isRequired,
    activeRequests: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { requestMovieDetail, location } = this.props;

    // remove the / for getting the movie id
    const movieId = location.pathname.split('-')[0].slice(1);
    return requestMovieDetail(movieId);
  }

  handleOverview = overview => (
    overview === 'Add the plot.' ? (
      <Badge color="info">
              Coming soon
      </Badge>
    ) : overview
  )

  render() {
    console.log(this.props, 'this props');
    const { movieDetailReducer: { data, activeRequests } } = this.props;
    const { handleOverview } = this;

    if (data && activeRequests === 0) {
      return (
        <div>
          <Jumbotron>
            <h1 className="display-3">
              {data.title}
            </h1>
            <p className="lead">
              {data.tagline}
            </p>
            <hr className="my-2" />
            <p>
              {handleOverview(data.overview)}
            </p>
            <p className="lead">
              <Button color="primary">
      Learn More
              </Button>
            </p>
          </Jumbotron>
        </div>
      );
    }

    return <LoadingBar progress={activeRequests} />;
  }
}

const mapStateToProps = ({ movieDetailReducer }) => ({
  movieDetailReducer,
});

export default connect(mapStateToProps, { requestMovieDetail })(MovieDetail);
