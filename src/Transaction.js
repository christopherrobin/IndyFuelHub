import React, { Component } from 'react';
import { get, filter, split } from 'lodash';
import { Spinner, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { OpenInNew, ArrowBackIos } from '@material-ui/icons';
import RosterListCard from './RosterListCard'
import Parser from 'rss-parser';

let parser = new Parser();
const API = `https://cors-anywhere.herokuapp.com/https://www.eliteprospects.com/rss_team.php?team=16336`;

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
    const { moveId } = this.props.match.params;
    const { feedResults, isLoading } = this.state;
    const allRosterMoves = get(feedResults, 'items', false);
    
    const getRosterMoveByMoveId =
      filter(
        allRosterMoves,
        ['guid', `http://www.eliteprospects.com/player.php?player=${moveId}`]
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
      const filteredMove = getRosterMoveByMoveId.reduce(reducer);
      const sourceLink = split(filteredMove.content, 'Source: <a href="')[1].slice(0, -14);
      return (
        <div>
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
