import React from 'react';
import {
  Navbar,
  NavbarBrand,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';

class Navigation extends React.Component {
  render() {

    return (
      <div>
          <Navbar color="success" light expand="md">
          <NavbarBrand>
            <Link className="brand" to="/">
                sanflix
            </Link>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
export default Navigation;
