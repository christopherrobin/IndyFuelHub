import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LocalGasStation } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
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
                    <h1>Indy Fuel Hub</h1>
                  </Link>
                </header>
              </Col>
            </Row>
          </Container>
        </header>
        <div style={{ background: '#f1f1f1' }}>
          <Container>
            <Row>
              <Col xs={12} style={{ margin: '.5em 0' }}>
              <Link to={'/'}>Transactions</Link>
              <Link to={'/Schedule'} style={{ marginLeft: '2em' }}>Schedule</Link>
              <Link to={'/Results'} style={{ marginLeft: '2em' }}>Spoiler Free Results</Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default (Header);
