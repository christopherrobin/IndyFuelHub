import React, { Component } from 'react';
import RosterList from './RosterList';
import { Container, Row, Col } from 'reactstrap';
import './App.css'
import { LocalGasStation } from '@material-ui/icons';

class App extends Component {
  render() {
    return (
      <div className="App">
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
        <Container>
            <RosterList/>
        </Container>
      </div>
    );
  }
}

export default(App);
