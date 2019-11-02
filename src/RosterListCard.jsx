import React, { Component } from 'react';
import { split } from 'lodash';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Event, Link as LinkIcon, RemoveCircle, GroupAdd } from '@material-ui/icons';
import './RosterList.css';

class RosterListCard extends Component {
  render() {
    const { move } = this.props;
    const incoming = move.title.includes('to Indy Fuel');
    const source = split(move.content, 'Source: <a href="')[1].slice(0, -14);
    const moveId = move.guid.slice(-6).replace('=','');
    const dateId = move.pubDate.replace('/', '').replace('/', '')
    const hubLink = `/Transaction/${moveId}/${dateId}`;
    return (
      <div id="RosterListCard">
        <Card
          key={move.moveId}
          className={`roster-list-card-${incoming ? 'incoming' : 'outgoing'}`}>
          <CardBody>
            <h5>{move.title}</h5>
            {
              incoming ?
                <div className='roster-list-tag incoming'><GroupAdd/> Incoming</div>
                :
                <div className='roster-list-tag outgoing'><RemoveCircle/> Outgoing</div>
            }
            <div><Event /> <span>{move.pubDate}</span></div>
            <div>
              <div className="gray" style={{ borderTop: '1px solid #ccc', marginTop: '.6em', paddingTop: '.6em' }}></div>
              <div>Source: <a href={source} target="_blank" rel="noopener noreferrer">{source}</a></div>
              <div>
                <LinkIcon/> IndyFuelHub.com{hubLink}
              </div>
              <div className="details-button">
                <Link to={hubLink}>
                  <Button block style={{marginTop: '1.5em'}}>
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default (RosterListCard);
