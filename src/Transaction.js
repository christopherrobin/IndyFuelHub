import React, { Component } from 'react';
// import Parser from 'rss-parser';

// let parser = new Parser();
// const API = `https://cors-anywhere.herokuapp.com/https://www.eliteprospects.com/rss_team.php?team=16336`;

class Transaction extends Component {
  render() {
    const { test } = this.props.match.params;
    return (
      <div>
        <h1>Transaction</h1>
        <p>{test}</p>
      </div>
    );
  }
}

export default (Transaction);
