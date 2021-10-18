import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
   Card, Button,
  CardTitle,  Row, Col, CardImg, CardBody,
  Container,
  Form, FormGroup, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import requestNowPlaying from './action';
import './style.css';

import LoadingBar from '../LoadingBar';


// eslint-disable-next-line
class MovieList extends React.Component {

  static propTypes = {
    nowPlayingReducer: PropTypes.object.isRequired,
    requestNowPlaying: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    modal: false,
    item: {}
  }

  setDataFromStorage = () => {
    const { nowPlayingReducer: { data: { Search } } } = this.props;

    console.log( this.props.nowPlayingReducer, 'nowplaying')
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
          <img src={item.Poster} alt="item-poster"/>
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
    const { nowPlayingReducer: { activeRequests } } = this.props;

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
                <CardImg top width="100%" src={item.Poster} alt="Card image cap" onClick={() => setModal(item)} />
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
    }

    return <LoadingBar progress={activeRequests} />;
  }



  render() {

    const { renderNowPlaying, setQuery,} = this;
    const { query } = this.state;
    const { requestNowPlaying } = this.props;
   
   
    return (
      <Container>
         <Row>
            <Col>
                 <Form>
                  <Row form>
                    <Col md={12}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Search any movie with Title" onChange={(e) => setQuery(e)} />
                    </Col>
                   <Col className="btnWrapper">      
                        <Button onClick={() => requestNowPlaying(query)}>Button</Button>   
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
            </Container>

    );
  }
}

const mapStateToProps = ({ nowPlayingReducer }) => ({
  nowPlayingReducer,
});

export default connect(mapStateToProps, { requestNowPlaying })(MovieList);
