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
    title: PropTypes.string,
    price: PropTypes.string,
    purchase: PropTypes.bool,
    RequestPurchase: PropTypes.func.isRequired,

  }

  state = {
    show: false,
    purchase: false,
    finish: false,
  }

  componentDidMount() {
    const { balanceReducer: { status } } = this.props;
    const { handleDelayOpenAtBeginning } = this;
    if (status) {
      handleDelayOpenAtBeginning();
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { purchase } = this.props;
    const { handleOpenPurchaseConfirmation } = this;
    if (prevProps.purchase !== purchase) {
      return handleOpenPurchaseConfirmation();
    }
    return null;
  }

  handleDelayOpenAtBeginning = () => {
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 3000);
  }

  handleOpenPurchaseConfirmation = () => {
    this.setState({
      show: true,
      purchase: true,
    });
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
      purchase: false,
    });

    setTimeout(() => {
      this.setState({
        show: true,
        finish: true,
      });
    }, 1000);
  }

  handleAfterPurchasing = () => {
    this.setState({
      show: false,
      finish: false,
    });
  }

  handleRenderAlertType = () => {
    const { purchase, show, finish } = this.state;
    const { title, price, balanceReducer: { balance } } = this.props;
    const { handlePurchasing, handleBonusBalance, handleAfterPurchasing } = this;
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

    if (finish) {
      return (
        <SweetAlert
          show={show}
          type="success"
          title="CONGRATULATIONS !"
          text={`You just succesfully purchase ${title} !, your current balance is RP. ${balance}`}
          onConfirm={() => handleAfterPurchasing()}
        />
      );
    }
    return (
      <SweetAlert
        show={show}
        type="success"
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

Alert.defaultProps = {
  title: '',
  price: '',
  purchase: false,
};

const mapStateToProps = ({ balanceReducer }) => ({
  balanceReducer,
});

export default connect(mapStateToProps, { RequestBonusBalance, RequestPurchase })(Alert);
