import React, { Component } from 'react'
import { Link } from 'react-router';
import Blockies from 'react-blockies';
const ReactMarkdown = require('react-markdown')

export default class BountyStats extends Component {
  render() {
    const { state, categories } = this.props;
    return <div className="bountyDetails" style={{ float: "left", display: "inline-block", width: "calc(100% - 260px)", overflow: "hidden", textOverflow: "ellipsis" }}>
      <ReactMarkdown source={state.description} />
    </div>;
  }
}