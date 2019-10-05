import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
  render() {
    return (
      <div style={{ margin: '2em 0', textAlign: 'center' }}>
        <h1>¯\_(ツ)_/¯</h1>
        <h2 style={{marginBottom: '2em'}}>Oops! Sorry, we cant find that page.</h2>
        <Link to={'/'}>lets go back home</Link>
      </div>
    );
  }
}

export default (PageNotFound);
