import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import './RosterList.css';
import _ from 'lodash';
import { Event, Link, RemoveCircle, GroupAdd } from '@material-ui/icons';

class RosterListCard extends Component {
  render() {
    const { move } = this.props;
    const incoming = move.title.includes('to Indy Fuel');
    const source = _.split(move.content, 'Source: <a href="')[1].slice(0, -14);
    return (
      <div id="RosterListCard">
        <Card
          key={move.contentSnippet}
          className={`roster-list-card-${incoming ? 'incoming' : 'outgoing'}`}>
          <CardBody>
            <h5>{move.title}</h5>
            {
              incoming ?
                <span className='roster-list-tag incoming'><GroupAdd/> Incoming</span>
                :
                <span className='roster-list-tag outgoing'><RemoveCircle/> Outgoing</span>
            }
            <div><span className="gray"><Event /> <span>{move.pubDate}</span></span></div>
            <div>
              <div className="gray" style={{ borderTop: '1px solid #ccc', marginTop: '.6em', paddingTop: '.6em' }}>
                <Link/> Source <a href={source} target="_blank" rel="noopener noreferrer">{source}</a>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default (RosterListCard);
