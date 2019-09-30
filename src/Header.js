import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LocalGasStation } from '@material-ui/icons';

class Header extends Component {
  render() {
    return (
      <header id='header-wrapper'>
        <Container>
          <Row>
            <Col xs={12}>
              <header className="App-header">
                <span style={{ fontSize: '3em' }}>
                  <LocalGasStation fontSize="large"/>
                </span>
                <strong style={{ fontSize: '2.5em', paddingLeft: '.2em' }}>Indy Fuel Hub</strong>
              </header>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default (Header);
