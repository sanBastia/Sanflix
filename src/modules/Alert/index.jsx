import React from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import PropTypes from 'prop-types';

import { RequestBonusBalance } from './action';


class Alert extends React.Component {
  static propTypes = {
    RequestBonusBalance: PropTypes.func.isRequired,
    balanceReducer: PropTypes.object.isRequired,
  }

  state = {
    show: false,
  }

  componentDidMount() {
    const { balanceReducer: { status } } = this.props;
    if (status) {
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 2000);
    }
    return null;
  }

  handleBonusBalance = () => {
    const { RequestBonusBalance } = this.props;
    RequestBonusBalance();
    this.setState({
      show: false,
    });
  }

  render() {
    const { show } = this.state;
    const { handleBonusBalance } = this;
    return (
      <SweetAlert
        show={show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => handleBonusBalance()}
      />
    );
  }
}

const mapStateToProps = ({ balanceReducer }) => ({
  balanceReducer,
});

export default connect(mapStateToProps, { RequestBonusBalance })(Alert);
