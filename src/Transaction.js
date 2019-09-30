import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Transaction extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Transaction</h1>
        <Footer />
      </div>
    );
  }
}

export default (Transaction);