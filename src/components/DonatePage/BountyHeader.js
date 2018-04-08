import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs';

class TabTemplate extends Component {
  render() {
    if (!this.props.selected) {
      return null;
    }
    return this.props.children;
  }
}

export default class BountyHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainTabValue: 0
    }
  }

  handleMainTabsChange = (value) => {
    this.setState({
      mainTabValue: value,
    });
  }

  render() {
    const tabs = <Tabs tabItemContainerStyle={{
      width: "100%",
      borderBottom: "1px solid black",
      color: 'black',
      backgroundColor: 'none'
    }}
      inkBarStyle={{
        width: "100%",
        borderBottom: "2px solid black",
        color: 'black',
        backgroundColor: 'none'
      }}
      onChange={this.handleMainTabsChange}
      value={this.state.mainTabValue}
      tabTemplate={TabTemplate}
      style={{
        width: "100%",
        borderBottom: "2px solid black",
        color: 'black',
        backgroundColor: 'none',
        display: 'block',
        marginBottom: '1em'
      }}
      contentContainerStyle={{
        backgroundColor: 'none'
      }}>
      <Tab label='About' value={0} style={{ fontWeight: this.state.mainTabValue === 0 ? "bold" : "normal", color: 'black', backgroundColor: 'none', display: 'block' }}>
        <div>
          <div style={{ width: '60%', float: 'left', boxSizing: 'border-box', padding: '1em', borderRight: "2px solid black" }}>
            The Salvation Army is a Christian organization that gives hope and support to vulnerable people in 400 communities across Canada and in 128 countries.
      The Salvation Army exists to share the love of Jesus Christ, meet human needs and be a transforming influence in the communities of our world. (visit our Web Site)
        </div>
          <div className="tabs" style={{ width: '40%', float: 'left', boxSizing: 'border-box', padding: '1em' }}>
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
      </Tab>
      <Tab label='Our Impact' value={1} style={{ fontWeight: this.state.mainTabValue === 1 ? "bold" : "normal", color: 'black', backgroundColor: 'none' }}>
      </Tab>
    </Tabs >;

    return tabs;
  }
}