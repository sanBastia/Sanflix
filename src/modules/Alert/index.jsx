import React from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import PropTypes from 'prop-types';

import { RequestBonusBalance, RequestPurchase } from './action';
import './style.css';
import { convertToInteger } from './util';

class Alert extends React.Component {
  static propTypes = {
    RequestBonusBalance: PropTypes.func.isRequired,
    balanceReducer: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    purchase: PropTypes.bool.isRequired,
    RequestPurchase: PropTypes.func.isRequired,

  }

  state = {
    show: false,
    purchase: false,
  }

  componentDidMount() {
    const { balanceReducer: { status } } = this.props;
    if (status) {
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 3000);
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { purchase } = this.props;
    if (prevProps.purchase !== purchase) {
      this.setState({
        show: true,
        purchase: true,
      });
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

  handlePurchasing = () => {
    const { RequestPurchase, price } = this.props;
    const result = convertToInteger(price);
    RequestPurchase(result);
    this.setState({
      show: false,
    });
  }

  handleRenderAlertType = () => {
    const { purchase, show } = this.state;
    const { title, price } = this.props;
    const { handlePurchasing, handleBonusBalance } = this;
    const result = `${title} - ${price}`;
    if (purchase) {
      return (
        <SweetAlert
          show={show}
          title="Purchase Confirmation"
          text={result}
          onConfirm={() => handlePurchasing()}
        />
      );
    }
    return (
      <SweetAlert
        show={show}
        title="CONGRATULATIONS !"
        text="You just got a BONUS RP. 100.000 BALANCE !"
        onConfirm={() => handleBonusBalance()}
      />
    );
  }

  render() {
    const { handleRenderAlertType } = this;
    return handleRenderAlertType();
  }
}

const mapStateToProps = ({ balanceReducer }) => ({
  balanceReducer,
});

export default connect(mapStateToProps, { RequestBonusBalance, RequestPurchase })(Alert);
