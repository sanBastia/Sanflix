import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
   Card, Button,
  CardTitle,  Row, Col, CardImg, CardBody,
  Container,
  Form, FormGroup, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from 'reactstrap';
import requestNowPlaying from './action';
import tempMovieImg from "../../common/Images/Movie.jpg";
import './style.css';

import LoadingBar from '../LoadingBar';
import { checkNA } from './util';


// eslint-disable-next-line
class MovieList extends React.Component {

  static propTypes = {
    nowPlayingReducer: PropTypes.object.isRequired,
    requestNowPlaying: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    modal: false,
    item: {},
    loading: false,
    page: 1,
    prevY: 0
  }
  componentDidMount(){
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;
    const { prevY, page, query } = this.state
    const { requestNowPlaying } = this.props;
    if (prevY > y) {
      const curPage = page + 1;
      requestNowPlaying(query,curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  setDataFromStorage = () => {
    const { nowPlayingReducer: { data: { Search } } } = this.props;
    const storage = window.localStorage;
    storage.setItem('result', JSON.stringify(Search));
  }

  getDataFromStorage = () => {
    const { waitingFromStorage } = this;
    const storage = window.localStorage;
    const temp = storage.getItem('result');
    if (waitingFromStorage(temp)) {
      return JSON.parse(temp);
    } 
  }

  waitingFromStorage = data => data !== 'undefined'

  
  setQuery = (e) => this.setState({query: e.target.value})
  setModal = (item) => this.setState((prevState) => ({modal: !prevState.modal, item: item}))



  handleRenderModal = () => {

    const { modal, item } = this.state;
    const { setModal } = this;
    return (
      <Modal isOpen={modal} toggle={setModal}>
        <ModalHeader toggle={setModal} charCode="X">{item.Title}</ModalHeader>
        <ModalBody>
          <img src={checkNA(item.Poster,tempMovieImg)} alt="item-poster"/>
        </ModalBody>
        <ModalFooter>
        <Button color="success">
                    <Link to={`/${item.Title}`}>
                       Take a look !
                    </Link>
                  </Button> 
        </ModalFooter>
    </Modal>
    )
}

  renderNowPlaying = () => {
    const { nowPlayingReducer: { activeRequests, data } } = this.props;
    const { page } = this.state;
    const {
      setDataFromStorage, getDataFromStorage,
      handleRenderModal,
      setModal,
      handleScroll
    } = this;

    setDataFromStorage();
    
    const storageResults = getDataFromStorage();
    if (storageResults && activeRequests === 0) {
      return (
        <Row>
          {storageResults.map(item => (
            <Col key={item.imdbID} md="3">
              <Card className="nowPlayingCard">
                <CardImg top width="100%" src={checkNA(item.Poster, tempMovieImg)} alt="template-movie-img" onClick={() => setModal(item)} />
                <CardBody>
                  <CardTitle>
                    {item.Title}
                  </CardTitle>
                  <Button color="success">
                    <Link to={`/${item.Title}`}>
                       Take a look !
                    </Link>
                  </Button> 
                </CardBody>
              </Card>
              {handleRenderModal()}
            </Col>
          ))}

        </Row>
      );
    } if(storageResults === undefined && data.Error === "Movie not found!") {
      return(
        <Alert color="danger">
        There is no movie any more, please type another one
      </Alert>
      )}

    return <LoadingBar progress={activeRequests} />;
  }



  render() {

    const { renderNowPlaying, setQuery,} = this;
    const { query, page } = this.state;
    const { requestNowPlaying } = this.props;
    return (
      <Container>
         <Row>
            <Col>
                 <Form>
                  <Row form>
                    <Col md={12}>
                        <Input type="text" name="text" id="text" placeholder="Search any movie with Title" onChange={(e) => setQuery(e)} />
                    </Col>
                   <Col className="btnWrapper">      
                        <Button onClick={() => requestNowPlaying(query,page)}>Search</Button>   
                   </Col>
                  </Row>
                  </Form>
          </Col>
      </Row>
                <Row>
                      <Col>
                        {renderNowPlaying()}
                      </Col>
                </Row>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                  >
                  </div>
            </Container>

    );
  }
}

const mapStateToProps = ({ nowPlayingReducer }) => ({
  nowPlayingReducer,
});

export default connect(mapStateToProps, { requestNowPlaying })(MovieList);
