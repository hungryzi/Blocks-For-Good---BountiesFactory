import React, { Component } from 'react'
import { Link } from 'react-router';

import SvgTwitter from 'material-ui-community-icons/icons/twitter';
import SvgFacebook from 'material-ui-community-icons/icons/facebook';
import SvgReddit from 'material-ui-community-icons/icons/reddit';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class BountyStats extends Component {
  render() {
    const { handleContribute, state } = this.props;
    return <div className="bountyPrice" style={{ float: "left", display: "inline-block" }}>
      <div style={{ backgroundColor: "rgba(1, 1, 1, 0.05)", display: "block", overflow: "hidden", padding: "15px" }}>
        <h5 style={{ fontSize: "13px", width: "100%", marginTop: "0px", marginBottom: "0px", color: "#8C9899", fontWeight: "200" }}>FUNDING NEEDED</h5>
        <h5 style={{ display: 'inline-block', marginTop: "7.5px", marginBottom: "0px", color: "#2D0874", fontSize: "32px", fontWeight: "600" }}>{state.value}<b style={{ color: "#fe923b", fontWeight: "600", lineHeight: "28px" }}>{state.symbol ? state.symbol : 'ETH'}</b></h5>
        <h5 style={{ display: 'inline-block', marginTop: "0px", color: "#aaa", marginBottom: "15px", fontSize: "32px", fontWeight: "200" }}>({numberWithCommas(parseInt((state.usdValue)))}USD)</h5>
        <p style={{ fontSize: "16px", width: "100%", margin: "2.5px 0px", marginBottom: "7.5px" }}>{state.balance + " " + state.symbol} funded ({Math.round(state.balance / state.value / 100) + "%"})</p>
      </div>

      <form className='Contribute' onSubmit={handleContribute} style={{ width: "100%", display: "inline-block", marginTop: "30px" }}>
        <h4 style={{ fontFamily: "Open Sans", marginTop: "0", margin: "0 auto", marginBottom: "15px", textAlign: "center", fontWeight: "600" }}>You can help make it happen!</h4>
        {state.contributionError &&
          <p style={{ fontSize: "12px", color: "#fe923b", marginTop: "0px", textAlign: "center" }}>{state.contributionError}</p>
        }
        <div style={{ backgroundColor: "#FF8D24" }}>
          <button type='submit' className='AddBtn' style={{ border: "0", backgroundColor: "#FF8D24", color: "rgb(25, 55, 83)" }}>Fund this project</button>
          <input id='deposit_amount' className='SendAmount' type='number' step="any" style={{ border: "none !important;" }} placeholder={state.symbol ? state.symbol : 'ΞTH'} />
        </div>
        <div>
          <button type='submit' className='FulfillBtn'>Accept call for action</button>
        </div>

        <div style={{ margin: "0 auto", display: "block", overflow: "hidden", width: "111px" }}>
          <Link target="_blank" to={"https://twitter.com/home?status=New Call for Help: " + state.title.substring(0, 80) + (state.title.length > 80 ? "..." : "") + "%20https%3A//beta.bounties.network/bounty/v1/" + state.bountyId}>
            <SvgTwitter style={{ width: "15px", height: "15px", color: "#4A79FA", padding: "5px", border: "1px solid rgb(25, 55, 83)", borderRadius: "100px", marginTop: "30px", marginRight: "15px" }}
              className="iconHover" />
          </Link>
          <Link target="_blank" to={"https://www.facebook.com/sharer/sharer.php?u=https%3A//beta.bounties.network/bounty/" + state.bountyId}>
            <SvgFacebook style={{ width: "15px", height: "15px", color: "#4A79FA", padding: "5px", border: "1px solid rgb(25, 55, 83)", borderRadius: "100px", marginTop: "30px", marginRight: "15px" }}
              className="iconHover" />
          </Link>
          <Link target="_blank" to={"http://reddit.com/submit?url=https%3A%2F%2Fbeta.bounties.network%2Fbounty%2F" + state.bountyId + "&title=" + state.title.substring(0, 80) + (state.title.length > 80 ? "..." : "")}>
            <SvgReddit style={{ width: "15px", height: "15px", color: "#4A79FA", padding: "5px", border: "1px solid rgb(25, 55, 83)", borderRadius: "100px", marginTop: "30px" }}
              className="iconHover" />
          </Link>
        </div>
      </form>

    </div>;
  }
}