import React, { useState, useEffect } from 'react';
import { get, map, filter } from 'lodash';
import { Row, Col, Collapse, Button, CardBody, Card, Alert } from 'reactstrap';
import ScoreBoard from './ScoreBoard'
import * as moment from 'moment';

const Results = (props) => {
  // Accordian
  const [isOpen, setIsOpen] = useState(false);

  // Data
  const [hasError, setErrors] = useState(false);
  const [response, setResponse] = useState({});

  async function fetchData() {
    const res = await fetch("https://www.echl.com/api/s3?q=schedule-5f4e319b38c0fcf74b12136f.json");
    res
      .json()
      .then(res => setResponse(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const buttonColor = isOpen ? 'secondary' : 'danger';
  const data = get(response, 'data', false);
  console.log(data);
  const fuelGames = filter(data, x => x.teams.away.name | x.teams.home.name === 'Indy Fuel');

  return (
    <div id="Results-Container">
      <Button color={buttonColor} onClick={toggle} style={{ marginBottom: '1em' }}>Reveal Past Results</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <h2>Past Results</h2>
            {
              hasError || !data ?
              <Alert color="danger">There was an error retrieving past games.</Alert>
              : null
            }
            {
              map(fuelGames, game => (
                <div key={game.externalId}>
                  <div className="results-entry">
                    <div><strong>{moment(get( game, 'startDate', false)).format("dddd, MMMM Do YYYY")} @ {moment(get( game, 'startDate', false)).format("hh:mma")}</strong></div>
                    <div style={{ marginBottom: '1em' }}><em>{get(game, 'venue.name', false)}</em></div>
                    <Row>
                      <Col xs={3}>
                        <p>Home</p>
                        <p>{get(game, 'teams.home.name', '')}</p>
                      </Col>
                      <Col xs={3}>
                        <p>Away</p>
                        <p>{get(game, 'teams.away.name', '')}</p>
                      </Col>
                    </Row>
                    <ScoreBoard
                      homeScore={get(game, 'results.scores.home', '')}
                      awayScore={get(game, 'results.scores.away', '')}
                    />
                  </div>
                </div>
              ))
            }
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default Results;
