import React, { useState, useEffect } from 'react';
import { get, map, filter, orderBy } from 'lodash';
import { Row, Col, Collapse, Button, CardBody, Card, Alert, Spinner } from 'reactstrap';
import ScoreBoard from './ScoreBoard'
import * as moment from 'moment';

const Results = (props) => {

  const pathName = get(props, 'location.pathname', false);
  const isResultsPage = pathName === '/Results';

  // Accordian
  const [isOpen, setIsOpen] = useState(isResultsPage);

  // Data
  const [hasError, setErrors] = useState(false);
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const url = "https://jsonp.afeld.me/?url=https://www.echl.com/api/s3?q=schedule-5f4e319b38c0fcf74b12136f.json";
    const res = await fetch(url,
      {
        mode: 'cors'
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      }
    );
    res
      .json()
      .then(setIsLoading(false))
      .then(res => setResponse(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const buttonColor = isOpen ? 'secondary' : 'danger';
  const data = get(response, 'data', false);

  // filter by games that are not the Fuel and haven't started yet
  const fuelGames = filter(data, x => x.teams.away.name | x.teams.home.name === 'Indy Fuel' && x.status !== 'not-started');
  // Sort the filtered games by date
  const fuelGamesSortedAndFiltered = orderBy(fuelGames, function(o) { return new moment(o.startDate); }, ['desc']);

  return (
    <div id="Results-Container">
      {
        isResultsPage ? null : <Button color={buttonColor} onClick={toggle} style={{ marginBottom: '1em' }}>Reveal Spoiler Free Results</Button>
      }

      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <h2>Past Results</h2>
            {
              hasError ?
              <Alert color="danger">There was an error retrieving past games.</Alert>
              : null
            }
            {
              isLoading ?
              <div className="loading-spinner">
                <Spinner
                  color="danger"
                  style={{
                    height: '12em',
                    width: '12em',
                  }}
                />
                <h2>Loading...</h2>
              </div>
              : null
            }
            {
              map(fuelGamesSortedAndFiltered, game => (
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
