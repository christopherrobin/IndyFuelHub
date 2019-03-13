import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import './RosterList.css';

class RosterListCard extends Component {
  render() {
    const { move } = this.props;
    const incoming = move.title.includes('to Indy Fuel');
    return (
      <div id="RosterListCard">
        <Card
          key={this.props.move.contentSnippet}
          className={`roster-list-card-${incoming ? 'incoming' : 'outgoing'}`}>
          <CardBody>
            <CardText>
              <strong className='date'>{this.props.move.pubDate}</strong>
              {
                incoming ?
                  <span className='roster-list-tag incoming'>Incoming</span>
                  :
                  <span className='roster-list-tag outgoing'>Outgoing</span>
              }
              {this.props.move.title}<br />
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default (RosterListCard);
