import React, { Component } from 'react';
import RosterList from './RosterList';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'reactstrap';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container>
            <RosterList/>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default(App);
