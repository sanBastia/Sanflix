import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaMoney } from 'react-icons/lib/fa/';

import './style.css';


class Navigation extends React.Component {
  static propTypes = {
    balanceReducer: PropTypes.object.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { toggle } = this;
    const { balanceReducer: { balance } } = this.props;
    return (
      <div>
        <Navbar color="success" light expand="md">
          <NavbarBrand>
            <Link className="brand" to="/">
                TokoFlix
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <FaMoney color="white" size={20} />
                  <span className="balance">
                    RP.
                    {balance}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/sanBastia/Tokoflix">
                  <span className="github">
                      GitHub
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ balanceReducer }) => ({
  balanceReducer,
});

export default connect(mapStateToProps, null)(Navigation);
