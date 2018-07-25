import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Jumbotron, Badge, Row, Col, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FaTag, FaMoney } from 'react-icons/lib/fa/';
import { TiStarFullOutline } from 'react-icons/lib/ti';

import './style.css';
import { requestMovieDetail, requestMovieCast } from './action';
import LoadingBar from '../LoadingBar';
import person from '../../common/Images/profile.png';
import movie from '../../common/Images/Movie.jpg';
import { GetPrices } from './util';
import Alert from '../Alert';

class MovieDetail extends Component {
  static propTypes = {
    requestMovieDetail: PropTypes.func.isRequired,
    requestMovieCast: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    movieDetailReducer: PropTypes.object.isRequired,
    movieCastReducer: PropTypes.object.isRequired,
  };

  state = {
    openAlert: false,
  }

  componentDidMount() {
    const { requestMovieDetail, requestMovieCast, location } = this.props;

    // remove the '/' for getting the movie id
    const movieId = location.pathname.split('-')[0].slice(1);
    requestMovieDetail(movieId);
    requestMovieCast(movieId);
  }

  handleOpenAlert = () => {
    this.setState({
      openAlert: true,
    });
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
          </Jumbotron>
          <Alert show={openAlert} purchase={openAlert} title={data.title} price={price} />
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
