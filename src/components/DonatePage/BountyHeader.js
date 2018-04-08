import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';

export default class BountyHeader extends Component {
  render() {
    return <div style={{ paddingBottom: '1em' }}>
      <div style={{ paddingBottom: '1em' }}>
        <span style={{ fontWeight: 'bold', float: 'left', paddingRight: '1em' }}>About</span>
        <span>
          <Link to={"/tracking/"}>
            Our Impact
            </Link>
        </span>
      </div>
      <div style={{ width: '60%', float: 'left', boxSizing: 'border-box', paddingRight: '1em', borderRight: "2px solid black" }}>
        The Salvation Army is a Christian organization that gives hope and support to vulnerable people in 400 communities across Canada and in 128 countries.
  The Salvation Army exists to share the love of Jesus Christ, meet human needs and be a transforming influence in the communities of our world. (visit our Web Site)
        </div>
      <div className="tabs" style={{ width: '40%', float: 'left', boxSizing: 'border-box', paddingLeft: '1em' }}>
        <div className="tab">
          DONATIONS RECEIVED
            <br />
          2,000 ETH
          </div>
        <div className="tab">
          FUNDED ACTIONS
            <br />
          100,000
          </div>
        <div className="tab">
          REPUTATION
            <br />
          1,000 tokens rewarded
          </div>
        <div className="tab">
          LIVE ACTIONS
            <br />
          3,000
          </div>
      </div>
    </div>;
  }
}