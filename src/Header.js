import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LocalGasStation } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header id='header-wrapper'>
        <Container>
          <Row>
            <Col xs={12}>
              <header className="App-header">
                <span style={{ fontSize: '3em' }}>
                <Link to={'/'}>
                  <LocalGasStation fontSize="large"/>
                </Link>
                </span>
                <Link to={'/'}>
                  <strong style={{ fontSize: '2.5em', paddingLeft: '.2em' }}>Indy Fuel Hub</strong>
                </Link>
              </header>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default (Header);
