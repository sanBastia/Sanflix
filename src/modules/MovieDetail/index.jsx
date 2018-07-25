import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Jumbotron, Badge, Row, Col, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaTag, FaMoney } from 'react-icons/lib/fa/';
import { TiStarFullOutline } from 'react-icons/lib/ti';

import './style.css';
import { requestMovieDetail, requestMovieCast, requestSimilarMovie } from './action';
import LoadingBar from '../LoadingBar';
import person from '../../common/Images/profile.png';
import movie from '../../common/Images/Movie.jpg';
import { GetPrices } from './util';
import Alert from '../Alert';

class MovieDetail extends Component {
  static propTypes = {
    requestMovieDetail: PropTypes.func.isRequired,
    requestMovieCast: PropTypes.func.isRequired,
    requestSimilarMovie: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    movieDetailReducer: PropTypes.object.isRequired,
    movieCastReducer: PropTypes.object.isRequired,
    similarMovieReducer: PropTypes.object.isRequired,
  };

  state = {
    openAlert: false,
  }

  componentDidMount() {
    const {
      requestMovieDetail, requestMovieCast, requestSimilarMovie, location,
    } = this.props;

    // remove the '/' for getting the movie id
    const movieId = location.pathname.split('-')[0].slice(1);
    requestMovieDetail(movieId);
    requestMovieCast(movieId);
    requestSimilarMovie(movieId);
  }

  componentDidUpdate(prevProps) {
    const {
      requestMovieDetail, requestMovieCast, requestSimilarMovie, location,
    } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      const movieId = location.pathname.split('-')[0].slice(1);
      requestMovieDetail(movieId);
      requestMovieCast(movieId);
      requestSimilarMovie(movieId);
    }
  }

  handleOpenAlert = () => {
    this.setState({
      openAlert: true,
    });
  }

  handleLinkToMovieDetail = (movie) => {
    const { id, title } = movie;
    const tempTitle = title.split(' ').length;
    if (tempTitle > 1) {
      const res = `${id}-${title.split(' ').join('-')}`;
      return res;
    }
    return `${id}-${title}`;
  }


  renderCast = () => {
    const { movieCastReducer: { data: { cast } } } = this.props;
    if (cast) {
      return (
        <Row className="horizontalScrollingcast">
          { cast.map(item => (
            <Col key={item.id} sm="3">
              <Card>
                <CardImg top width="100%" src={item.profile_path === null ? person : `https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="Card image cap" />
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


  renderTagline = (tagline) => {
    if (tagline === '') {
      return (
        <div>
          <FaTag size={30} />
          <Badge className="miniTag" color="info">
          Coming soon
          </Badge>
        </div>
      );
    }
    return (
      <div>
        <FaTag size={30} />
        <i className="miniTag">
          {tagline}
        </i>
      </div>
    );
  };


  renderSimilar = () => {
    const { similarMovieReducer: { data: { results } } } = this.props;
    const { handleLinkToMovieDetail } = this;

 
    if (results) {
      if (results.length === 0) {
        return (
          <Badge color="info">
                Coming soon
          </Badge>
        );
      }
      return (
        <Row className="horizontalScrollingcast">
          { results.map(item => (
            <Col key={item.id} md="3">
              <Card className="nowPlayingCard">
                <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="Card image cap" />
                <CardBody>
                  <CardTitle>
                    {item.title}
                  </CardTitle>

                  <Button color="success">
                    <Link to={handleLinkToMovieDetail(item)}>
                      Take a look !
                    </Link>
                  </Button>
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

  renderRating = rate => (
    <div>
      <TiStarFullOutline size={30} />
      <span className="miniTag">
        {rate}
      </span>
    </div>
  )

  renderPrice = rate => (
    <div>
      <FaMoney size={30} />
      <span className="miniTag">
        {GetPrices(rate)}
      </span>
    </div>
  )

  renderOverview = overview => (
    overview === 'Add the plot.' ? (
      <Badge color="info">
              Coming soon
      </Badge>
    ) : overview
  )

  renderPurchaseButton = rate => (
    <Button className="miniInfo" color="success" size="lg" block disabled={rate === 0} onClick={() => this.handleOpenAlert()}>
      {rate === 0 ? 'Coming Soon' : 'PURCHASE'}
    </Button>
  )


  render() {
    const { openAlert } = this.state;
    const { movieDetailReducer: { data, activeRequests } } = this.props;
    const {
      renderOverview, renderCast, renderTagline,
      renderRating, renderPrice, renderPurchaseButton,
      renderSimilar,
    } = this;

    const price = GetPrices(data.vote_average);

    if (data && activeRequests === 0) {
      return (
        <div>
          <Jumbotron className="jumbo">
            <Row>
              <Col md="6">
                <h1 className="display-3">
                  {data.title}
                </h1>
                <Row>
                  <Col className="miniInfo" sm="6">
                    {renderTagline(data.tagline)}
                  </Col>
                  <Col className="miniInfo" sm="6">
                    {renderRating(data.vote_average)}
                  </Col>
                </Row>
                <Row>
                  <Col className="miniInfo">
                    {renderPrice(data.vote_average)}
                  </Col>
                </Row>
                <Row>
                  {renderPurchaseButton(data.vote_average)}
                </Row>
              </Col>
              <Col md="6">
                <Card>
                  <CardImg top width="100%" src={data.backdrop_path === null || data.backdrop_path === 'np' ? movie : `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt="Card image cap" />
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
            <hr className="my-2" />
            <h5>
              Similar
            </h5>
            {renderSimilar()}
          </Jumbotron>
          <Alert show={openAlert} purchase={openAlert} title={data.title} price={price} />
        </div>
      );
    }

    return <LoadingBar progress={activeRequests} />;
  }
}

const mapStateToProps = ({ movieDetailReducer, movieCastReducer, similarMovieReducer }) => ({
  movieDetailReducer,
  movieCastReducer,
  similarMovieReducer,
});

export default connect(mapStateToProps, { requestMovieDetail, requestMovieCast, requestSimilarMovie })(MovieDetail);
