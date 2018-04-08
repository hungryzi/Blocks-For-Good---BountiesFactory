import React, { Component } from 'react'

export default class BountyHeader extends Component {
  render() {
    return <div className="charityInfo">
      <div>
        <div>About</div>
        <div>Our Impact</div>
      </div>
      <div>
        <div style={{ width: '60%', float: 'left' }}>
          The Salvation Army is a Christian organization that gives hope and support to vulnerable people in 400 communities across Canada and in 128 countries.
    The Salvation Army exists to share the love of Jesus Christ, meet human needs and be a transforming influence in the communities of our world. (visit our Web Site)
        </div>
        <div className="tabs" style={{ width: '40%', float: 'left' }}>
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
      </div>
    </div>;
  }
}