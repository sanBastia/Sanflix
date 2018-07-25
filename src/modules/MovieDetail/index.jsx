import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Jumbotron, Button, Badge, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './style.css';
import { requestMovieDetail, requestMovieCast } from './action';
import LoadingBar from '../LoadingBar';
import pic from '../../common/Images/profile.png';


// eslint-disable-next-line
class MovieDetail extends Component {

  static propTypes = {
    requestMovieDetail: PropTypes.func.isRequired,
    requestMovieCast: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    movieDetailReducer: PropTypes.object.isRequired,
    movieCastReducer: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { requestMovieDetail, requestMovieCast, location } = this.props;

    // remove the '/' for getting the movie id
    const movieId = location.pathname.split('-')[0].slice(1);
    requestMovieDetail(movieId);
    requestMovieCast(movieId);
  }

  renderOverview = overview => (
    overview === 'Add the plot.' ? (
      <Badge color="info">
              Coming soon
      </Badge>
    ) : overview
  )

  renderCast = () => {
    const { movieCastReducer: { data: { cast } } } = this.props;
    if (cast) {
      return (
        <Row className="horizontalScrollingcast">
          { cast.map(item => (
            <Col key={item.id} sm="3">
              <Card>
                <CardImg top width="100%" src={item.profile_path === null ? pic : `https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="Card image cap" />
                <CardBody>
                  <CardTitle>
                    {item.character}
                  </CardTitle>
                  <CardSubtitle>
                    {item.name}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          ))
      }
        </Row>
      );
    }
    return 'Loading';
  }

  render() {
    console.log(this.props, 'this props');
    const { movieDetailReducer: { data, activeRequests } } = this.props;
    const { renderOverview, renderCast } = this;

    if (data && activeRequests === 0) {
      return (
        <div>
          <Jumbotron className="jumbo">
            <Row>
              <Col md="6">
                <h1 className="display-3">
                  {data.title}
                </h1>
                <p className="lead">
                  {data.tagline}
                </p>
              </Col>
              <Col md="6">
                <Card>
                  <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt="Card image cap" />
                </Card>
              </Col>
            </Row>
            <hr className="my-2" />
            <h5>
                Synopsis
            </h5>
            <p>
              {renderOverview(data.overview)}
            </p>
            <hr className="my-2" />
            <h5>
              Cast
            </h5>
            {renderCast()}
          </Jumbotron>
        </div>
      );
    }

    return <LoadingBar progress={activeRequests} />;
  }
}

const mapStateToProps = ({ movieDetailReducer, movieCastReducer }) => ({
  movieDetailReducer,
  movieCastReducer,
});

export default connect(mapStateToProps, { requestMovieDetail, requestMovieCast })(MovieDetail);
