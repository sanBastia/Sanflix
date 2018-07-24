import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,
  CardTitle, CardText, Row, Col, CardImg, CardBody, Badge,
  CardSubtitle,
} from 'reactstrap';
import classnames from 'classnames';
import requestNowPlaying from './action';
import './style.css';

import LoadingBar from '../LoadingBar';


// eslint-disable-next-line
class MovieList extends React.Component {

  static propTypes = {
    nowPlayingReducer: PropTypes.object.isRequired,
    requestNowPlaying: PropTypes.func.isRequired,
    activeRequests: PropTypes.number.isRequired,
  }

  state = {
    activeTab: '1',
  }

  componentDidMount = () => {
    const { requestNowPlaying } = this.props;
    return requestNowPlaying();
  }

  toggle = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleOverview = overview => (
    overview === 'Add the plot.' ? (
      <Badge color="info">
              Coming soon
      </Badge>
    ) : overview
  )

  renderNowPlaying = () => {
    const { nowPlayingReducer: { data: { results } }, activeRequests } = this.props;
    const { handleOverview } = this;
    if (results) {
      return (
        <Row>
          {results.map(item => (
            <Col key={item.id} md="3">
              <Card className="nowPlayingCard">
                <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="Card image cap" />
                <CardBody>
                  <CardTitle>
                    {item.title}
                  </CardTitle>
                  <CardSubtitle>
                    Synopsis
                  </CardSubtitle>
                  <CardText>
                    { handleOverview(item.overview) }
                  </CardText>
                  <Button color="success">
                    <Link to="/movie">
                     Take a look !
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}

        </Row>
      );
    }

    return <LoadingBar progress={activeRequests} />;
  }

  render() {
    const { activeTab } = this.state;
    const { toggle, renderNowPlaying } = this;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Now Playing
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Coming soon
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className="nowPlayingTab">
            {renderNowPlaying()}
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>
          Special Title Treatment
                  </CardTitle>
                  <CardText>
        With supporting text below as a natural lead-in to additional content.
                  </CardText>
                  <Button>
        Go somewhere
                  </Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>
        Special Title Treatment
                  </CardTitle>
                  <CardText>
              With supporting text below as a natural lead-in to additional content.
                  </CardText>
                  <Button>
            Go somewhere
                  </Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = ({ nowPlayingReducer }) => ({
  nowPlayingReducer,
});

MovieList.propTypes = {
  requestNowPlaying: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { requestNowPlaying })(MovieList);
