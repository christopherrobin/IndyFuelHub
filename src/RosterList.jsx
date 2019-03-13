import React, { Component } from 'react';
import { Spinner, Container } from 'reactstrap';
import ReactGA from 'react-ga';
import RosterListCard from './RosterListCard'
import Parser from 'rss-parser';
import './RosterList.css'

let parser = new Parser();
const API = `https://cors-anywhere.herokuapp.com/https://www.eliteprospects.com/rss_team.php?team=16336`;

const initializeReactGA = () => {
  ReactGA.initialize('UA-135718333-1');
  ReactGA.pageview('/roster-list-indy-fuel');
}

class RosterList extends Component {
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
    initializeReactGA();
  }

  render() {
    const { feedResults, isLoading } = this.state;
    const allRosterMoves = this.state.feedResults.items;
    // TODO: return error if we dont have feed results
    // const error = Object.keys(feedResults).length === 0;

    if (isLoading) {
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

    return (
      <div>
      <div id="roster-list-component">
        {
          allRosterMoves ? <div className="subheader"><h3>{feedResults.description}</h3></div> : null
        }
        {
          allRosterMoves ?
            allRosterMoves.map(move =>
              <RosterListCard move={move} key={move.contentSnippet} />
            )
            : null
        }
      </div>
        <Container>
          <footer id='footer'>
            crafted by&nbsp;
              <a
              href='http://www.spaceagebrains.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              space age brains
            </a>
          </footer>
        </Container>
      </div>
    );
  }
}

export default (RosterList);
