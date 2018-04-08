import React, { Component } from 'react'
import { Link } from 'react-router';
import Blockies from 'react-blockies';
const ReactMarkdown = require('react-markdown')

export default class BountyStats extends Component {
  render() {
    const { state, categories } = this.props;
    return <div className="bountyDetails" style={{ float: "left", display: "inline-block", width: "calc(100% - 260px)", overflow: "hidden", textOverflow: "ellipsis" }}>
      <p style={{ fontSize: "14px", margin: "4px  0px 10px 0px", display: "inline-block", float: "left" }}><b style={{ color: "#fe923b" }}>Charity address: </b></p>
      <Blockies
        seed={state.issuer}
        size={9}
        scale={2.5}
        style={{ borderRadius: "10px", display: "inline-block", float: "left" }}
      />
      <p style={{ fontSize: "14px", margin: "4px  0px 10px 0px", display: "inline-block", float: "left" }}><Link style={{ color: "#4a78fa" }} to={"/user/" + state.issuer}>{state.issuer}</Link></p>


      <p style={{ fontSize: "14px", width: "100%", margin: "0px 0px 10px 0px", display: "block", overflow: "hidden" }}><b style={{ color: "#fe923b", marginRight: "10px" }}>Status:</b> {state.stage}</p>

      <p style={{ fontSize: "14px", width: "100%", margin: "0px 0px 10px 0px", display: "block", overflow: "hidden" }}><b style={{ color: "#fe923b", marginRight: "10px" }}>Deadline:</b> {state.deadlineString}</p>

      <p style={{ fontSize: "14px", width: "100%", margin: "0px 0px 10px 0px" }}><b style={{ color: "#fe923b", marginRight: "10px" }}>Charity contact:</b> <a href={"mailto:" + state.contact} >{state.contact}</a></p>

      {state.paysTokens &&
        <p style={{ fontSize: "14px", width: "100%", margin: "0px 0px 10px 0px" }}><b style={{ color: "#fe923b", marginRight: "10px" }}>Token Contract:</b> <Link style={{ color: "#4a79fa" }} target={"_blank"} to={"https://etherscan.io/address/" + state.tokenAddress}>{state.tokenAddress}</Link></p>}
      <p style={{ fontSize: "14px", width: "100%", margin: "0px 0px 10px 0px" }}><b style={{ color: "#fe923b", marginRight: "10px" }}>Description: </b> </p>
      <ReactMarkdown source={state.description} />
      <div style={{ margin: "0 auto", display: "block", overflow: "hidden", marginTop: "15px" }}>
        {categories}
      </div>
    </div>;
  }
}