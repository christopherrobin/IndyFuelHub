import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <Container>
        <footer id='footer'>
          crafted by&nbsp;
            <a
            href='http://www.spaceagebrains.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            space age brains
          </a>
        </footer>
      </Container>
    );
  }
}

export default (Footer);
