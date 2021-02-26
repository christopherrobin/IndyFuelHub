import React, { Component } from 'react';
import { get, filter, split } from 'lodash';
import { Spinner, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { OpenInNew, ArrowBackIos } from '@material-ui/icons';
import { Helmet } from "react-helmet";
import RosterListCard from './RosterListCard'
import Parser from 'rss-parser';

let parser = new Parser();
const API = `https://thingproxy.freeboard.io/fetch/https://www.eliteprospects.com/rss_team.php?team=16336`;

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedResults: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });

    (async () => {
      let feed = await parser.parseURL(API);
      this.setState({
        feedResults: feed,
        isLoading: false
      });
    })();
    // initializeReactGA();
  }

  render() {
    const { moveId, dateId } = this.props.match.params;
    const { feedResults, isLoading } = this.state;
    const allRosterMoves = get(feedResults, 'items', false);
    
    const dateIdFormatted = dateId.slice(0, 4).match(/.{1,2}/g).join("/");
    const dateIdFormattedWithYear = `${dateIdFormatted}/2019`;
    
    const getRosterMoveByMoveId = filter(
      allRosterMoves, ['guid', `http://www.eliteprospects.com/player.php?player=${moveId}`]
    );

    const getRosterMove = filter(
      getRosterMoveByMoveId, ['pubDate', dateIdFormattedWithYear]
    );

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (isLoading || !allRosterMoves) {
      return(
        <div className="loading-spinner">
          <Spinner
            color="danger"
            style={{
              height: '12em',
              width: '12em',
            }}
          />
        </div>
      );
    }
    
    if (!isLoading && allRosterMoves) {
      const filteredMove = getRosterMove.reduce(reducer);
      const sourceLink = split(filteredMove.content, 'Source: <a href="')[1].slice(0, -14);
      return (
        <div>
          <Helmet>
              <meta charSet="utf-8" name="theme-color" content="#d24f41" />
              <title>Indy Fuel Transaction: {filteredMove.title}</title>
              <link rel="canonical" href="http://IndyFuelHub.com" />
          </Helmet>
          <Link to={'/'}>
            <Button><ArrowBackIos />Back to all transactions</Button>
          </Link>
          <a href={sourceLink} target="_blank" rel="noopener noreferrer">
            <Button style={{marginLeft: '1em'}}><OpenInNew /> View Source</Button>
          </a>
          <div id="Individual-Card">
            <RosterListCard
              key={moveId}
              move={filteredMove}
            />
          </div>
        </div>
      );
    }

  }
} 

export default (Transaction);
