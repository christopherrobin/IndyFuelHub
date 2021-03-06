import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import RosterList from './RosterList';
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
            <meta charSet="utf-8" name="theme-color" content="#d24f41" />
            <title>Indy Fuel Hub</title>
            <link rel="canonical" href="http://www.IndyFuelHub.com" />
        </Helmet>
        <RosterList/>
      </div>
    );
  }
}

export default(App);
