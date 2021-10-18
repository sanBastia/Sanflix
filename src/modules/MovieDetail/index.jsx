import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Jumbotron, Badge, Row, Col, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button, Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaTag, FaMoney } from 'react-icons/lib/fa/';
import { TiStarFullOutline } from 'react-icons/lib/ti';

import './style.css';
import { requestMovieDetail } from './action';
import LoadingBar from '../LoadingBar';
import { GetRatings } from './util';


class MovieDetail extends Component {
  static propTypes = {
    requestMovieDetail: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    movieDetailReducer: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      requestMovieDetail, location,
    } = this.props;

    // remove the '/' for getting the movie id
    const movieId = location.pathname.split('-')[0].slice(1);
    requestMovieDetail(movieId);

  }

  componentDidUpdate(prevProps) {
    const {
      requestMovieDetail, location,
    } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      const movieId = location.pathname.split('-')[0].slice(1);
      requestMovieDetail(movieId);

    }
  }

  render() {
   
    const { movieDetailReducer: { data, activeRequests, status } } = this.props;
    const { renderRating } = this;

    if (status === 'error') {
      return (
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">
             Sorry, not Found
            </h1>
            <p className="lead">
              Dont worry our Engineer will handle this,
              maybe Back to
              {' '}
              <Link to="/">
                Home
              </Link>
              {' '}
              ?
            </p>
          </Container>
        </Jumbotron>
      );
    }

    if (data && activeRequests === 0) {
      return (
        <div>
          <Jumbotron className="jumbo">
            <Row>
              <Col sm='6'>
                <h1 className="display-3">
                  {data.Title}
                </h1>
                <Row> 
                  {data.Response ? data.Ratings.map((rate,index) => {
                    return(
                              <Col key={index} className="miniInfo" sm="6">
                              {rate.Source}
                            <div>
                              <TiStarFullOutline size={30} />
                                <span className="miniTag">
                                  {rate.Value}
                                </span>
                            </div>
                    </Col>)}) : 'null'}
                </Row>
                <Row>
                  <Col className="miniInfo">
                  <h1>Synopsis</h1>
                   {data.Plot}
                  </Col>
                </Row>
              </Col>
              <Col sm="6">
                <Card>
                  <CardImg top width='auto' src={data.Poster} alt='data-poster' />
                </Card>
              </Col>
            </Row>
          </Jumbotron>
   
        </div>
      );
    }

    return <LoadingBar progress={activeRequests} />;
  }
}

const mapStateToProps = ({movieDetailReducer}) => ({
  movieDetailReducer,
});

export default connect(mapStateToProps, { requestMovieDetail})(MovieDetail);
