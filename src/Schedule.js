import React, { useState, useEffect } from "react";
import { Alert, Spinner, Card, CardBody, CardTitle, CardLink } from 'reactstrap';
import { Helmet } from "react-helmet";
import * as moment from 'moment';
import { get, map } from 'lodash';
import { Event, Schedule as ScheduleIcon } from '@material-ui/icons';
import Results from './Results';

const Schedule = (props) => {
  const [hasError, setErrors] = useState(false);
  const [scheduleResponse, setScheduleResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSchedule() {
    const url = "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=cQva35TBHtPqkafn6zXrCtXjJuNQVVmG&keyword=Indy%20Fuel&sort=date,asc";
    const response = await fetch(url,
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
    response
      .json()
      .then(setIsLoading(false))
      .then(response => setScheduleResponse(response))
      .catch(error => setErrors(error));
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fullSchedule = get(scheduleResponse, '_embedded.events', false);

  return (
    <div id="Schedule-Container">
      <Helmet>
          <title>Indy Fuel Schedule</title>
          <meta charSet="utf-8" name="theme-color" content="#d24f41" />
          <link rel="canonical" href="http://www.IndyFuelHub.com/Schedule" />
      </Helmet>
      <div style={{ marginTop: '2em' }}>
        <Results />
      </div>
      {
        fullSchedule && !isLoading ? <h2>Upcoming Schedule</h2> : null
      }
      {
        isLoading ?
          <div className="spinner-container">
            <Spinner
              animation="border"
              variant="danger"
              role="loading"
              style={{ width: '10em', height: '10em' }}
            />
          </div> : null
      }
      {
        hasError ?
          <div id="error">
            <Alert color="danger">Sorry, there was an error fetching schedule data.</Alert>
          </div> : null
      }
      {
        fullSchedule && !isLoading ?
        map(fullSchedule, value => {
          const date = moment(value.dates.start.dateTime).format("dddd, MMMM Do YYYY");
          const time = moment(value.dates.start.dateTime).format("hh:mma");
          return (
            <div className="schedule-entry" key={`${value.name}--${date}`}>
              <Card style={{ width: '100%', marginBottom: '1em' }}>
              <CardBody>
                <p><strong>{value.name}</strong></p>
                <CardTitle>
                  <Event className="gray" style={{ paddingBottom: '0.18em' }} /> {date}
                </CardTitle>
                <p><ScheduleIcon className="gray" style={{ paddingBottom: '0.18em' }} /> {time} @ {value._embedded.venues[0].name}</p>
                <CardLink href={value.url} target="_blank" rel="noopener noreferrer">Buy Tickets</CardLink>
              </CardBody>
              </Card>
            </div>
          )
        }) : null
      }
    </div>
  );
};

export default (Schedule);
