import React, { useState, useEffect } from "react";
import { Alert, Spinner, Card, CardBody, CardTitle, CardText, CardLink } from 'reactstrap';
import { Helmet } from "react-helmet";
import * as moment from 'moment';
import { get, map } from 'lodash';
import { Event } from '@material-ui/icons';

const Schedule = () => {
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
  // console.log(fullSchedule);

  return (
    <div id="Schedule-Container">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Indy Fuel Schedule</title>
          <link rel="canonical" href="http://www.IndyFuelHub.com/Schedule" />
      </Helmet>
      {
        fullSchedule && !isLoading ? <h3>Upcoming Schedule</h3> : null
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
          const date = moment(value.dates.start.dateTime).format("MM/DD/YYYY");
          return (
            <div className="schedule-entry" key={date}>
              <Card style={{ width: '100%', marginBottom: '1em' }}>
              <CardBody>
                <CardTitle><Event className="gray" style={{ paddingBottom: '0.18em' }} /> {date}</CardTitle>
                {value.name}
                <CardText>{value._embedded.venues[0].name}</CardText>
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
