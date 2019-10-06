import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Transaction from './Transaction'
import PageNotFound from './PageNotFound';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <div>
  <Router>
    <Header/>
      <Container>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/Transaction/:moveId" component={Transaction} />
          <Route component={PageNotFound} path="*" />
        </Switch>
      </Container>
    </Router>
  <Footer />
  </div>
)

ReactDOM.render(routing, document.getElementById('root'))


// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
