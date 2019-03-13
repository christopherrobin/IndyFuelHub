import React, { Component } from 'react';
import RosterList from './RosterList';
import { Container, Row, Col } from 'reactstrap';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header id='header-wrapper'>
          <Container>
            <Row>
              <Col xs={12}>
                <header className="App-header">
                  <h1>Roster Tracker</h1>
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
