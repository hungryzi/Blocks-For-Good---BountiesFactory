import React, { Component } from 'react'
import { Link } from 'react-router';

import SvgTwitter from 'material-ui-community-icons/icons/twitter';
import SvgFacebook from 'material-ui-community-icons/icons/facebook';
import SvgReddit from 'material-ui-community-icons/icons/reddit';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class BountyFunds extends Component {
  render() {
    const { state } = this.props;
    return (<div className="bountyPrice" style={{ width: "80%", float: "left", display: "inline-block" }}>
      <div style={{ backgroundColor: "rgba(1, 1, 1, 0.05)", display: "block", overflow: "hidden", padding: "15px", textAlign:"center"}}>
        <h5 style={{ fontSize: "13px", width: "100%", marginTop: "0px", marginBottom: "0px", color: "#8C9899", fontWeight: "200" }}>FUNDING NEEDED</h5>
        <h5 style={{ display: 'inline-block', marginTop: "7.5px", marginBottom: "0px", color: "#2D0874", fontSize: "32px", fontWeight: "600" }}>{state.value}<b style={{ color: "#fe923b", fontWeight: "600", lineHeight: "28px" }}>{state.symbol ? state.symbol : 'ETH'}</b></h5>
        <h5 style={{ display: 'inline-block', marginTop: "0px", color: "#aaa", marginBottom: "15px", fontSize: "32px", fontWeight: "200" }}>({numberWithCommas(parseInt((state.usdValue)))}USD)</h5>
        <p style={{ fontSize: "16px", width: "100%", margin: "2.5px 0px", marginBottom: "7.5px" }}>{state.balance + " " + state.symbol} funded ({Math.round(state.balance / state.value / 100) + "%"})</p>
      </div>
    </div>);
  }
}