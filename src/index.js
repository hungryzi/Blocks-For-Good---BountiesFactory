import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import DonatePage from './components/DonatePage/DonatePage';
import NewBounty from './components/NewBounty/NewBounty';
import UserPage from './components/UserPage/UserPage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './components/TermsOfService/TermsOfService';
import Leaderboard from './components/Leaderboard/Leaderboard';
import BountyFulfillmentPage from './components/BountyFulfillment/BountyFulfillmentPage';

import Trafficking from './components/BFG_Trafficking/Trafficking';
import Tracking from './components/BFG_Tracking/Tracking';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css'

  ReactDOM.render((
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/bountyFulfillment/:version/:id" component={BountyFulfillmentPage} />
        <Route path="/bounty/:version/:id" component={DonatePage} />
        <Route path="/user/:address" component={UserPage} />
        <Route path="/privacyPolicy/" component={PrivacyPolicy} />
        <Route path="/terms/" component={TermsOfService} />
        <Route path="/newBounty/" component={NewBounty} />
        <Route path="/leaderBoard/" component={Leaderboard} />

        <Route path="/trafficking/" component={Trafficking} />
        <Route path="/tracking/" component={Tracking} />
     </Router>
    </MuiThemeProvider>
), document.getElementById('root'));
