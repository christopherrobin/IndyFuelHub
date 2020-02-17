import React, { Component } from 'react';
import { split } from 'lodash';
import { Card, CardBody, Button, CardLink } from 'reactstrap';
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

            <p><strong>{move.title}</strong></p>
            <p><Event className="gray" style={{ paddingBottom: '0.10em' }} /> <span>{move.pubDate}</span></p>
            {
              incoming ?
                <p className='roster-list-tag incoming'><GroupAdd/> Incoming</p>
                :
                <p className='roster-list-tag outgoing'><RemoveCircle/> Outgoing</p>
            }
            <div className="gray" style={{ borderTop: '1px solid #ccc', marginTop: '.6em', paddingTop: '.6em' }}></div>
            <CardLink href={source} target="_blank" rel="noopener noreferrer">Source</CardLink>

            <div style={{ display: 'none' }}>
              <LinkIcon/> IndyFuelHub.com{hubLink}              
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
