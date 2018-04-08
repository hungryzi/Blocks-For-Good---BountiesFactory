import React, { Component } from 'react'
import './../BFG_Trafficking/Trafficking.css'

import Web3 from 'web3';
import Select from 'react-select';

import { Link } from 'react-router';

import 'whatwg-fetch';

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
const json = require('../../../contracts.json');
const IPFS = require('ipfs-mini');

//import logo from './images/logo.svg';
//import logoBounties from './images/logo-bounties.svg';
import logo from '../BFG_Trafficking/images/logo.png'
import shoes from '../BFG_Trafficking/images/shoes.jpg'
import search from '../BFG_Trafficking/images/spyglass.png'

import arrows from './images/arrows.png'
import lines from './images/lines.png'

import FlatButton from 'material-ui/FlatButton';

import ContractList from 'components/ContractList/ContractList';
import Navigation from 'components/Navigation/Navigation';

import Dialog from 'material-ui/Dialog';
import SvgArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class Tracking extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modalError: "",
			modalOpen: false,
			accounts: [],
			bounties: [],
			optionsList: [],
			loading: true,
			loadingMore: false,
			selectedStage: "",
			selectedMine: "ANY",
			sortBy: "Created",
			descending: true,
			searchQuery: "",
			StandardBounties: web3.eth.contract(json.interfaces.StandardBounties).at(json.mainNet.standardBountiesAddress.v1),
			UserComments: web3.eth.contract(json.interfaces.UserComments).at(json.mainNet.userCommentsAddress),
			nextUrl: "",
			categories: [],
			value: "",
			optionsUnseparated: "cryptochicksdemo",
			myDraft: 0,
			myActive: 0,
			myCompleted: 0,
			myDead: 0,
			myExpired: 0,
			myTotal: 0,
			resultsCount: 0,
			baseURL: json.url.mainNet
		}

		this.getInitialData();
	}

	getInitialData() {
		window.loaded = true;

		if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {

			// Use Mist/MetaMask's provider
			web3.setProvider(window.web3.currentProvider);

			web3.version.getNetwork((err, netId) => {
				console.log("rinkeby", json.url.rinkeby);

				if (netId === "1") {
					this.setState({
						StandardBounties: web3.eth.contract(json.interfaces.StandardBounties).at(json.mainNet.standardBountiesAddress.v1),
						UserCommentsContract: web3.eth.contract(json.interfaces.UserComments).at(json.mainNet.userCommentsAddress),
						selectedNetwork: netId,
						baseURL: json.url.mainNet
					});
				} else if (netId === "4") {
					this.setState({
						StandardBounties: web3.eth.contract(json.interfaces.StandardBounties).at(json.rinkeby.standardBountiesAddress.v1),
						StandardBountiesv0: web3.eth.contract(json.interfaces.StandardBounties).at(json.rinkeby.standardBountiesAddress.v0),
						UserCommentsContract: web3.eth.contract(json.interfaces.UserComments).at(json.rinkeby.userCommentsAddress),
						selectedNetwork: netId,
						baseURL: json.url.rinkeby
					});
					console.log("rinkeby", json.url.rinkeby);
				} else {
					this.setState({ modalError: ("Please change your Ethereum network to the Main Ethereum network or the Rinkeby network"), modalOpen: true });
				}

				setInterval(function () {
					web3.version.getNetwork(function (err, newNetId) {
						if (netId !== newNetId) {
							window.location.reload();
						}
					});
				}, 2000);



				web3.eth.getAccounts(function (err, accs) {
					if (err) {
						console.log('error fetching accounts', err);
					} else {
						if (accs.length === 0) {
							this.setState({ modalError: "Please unlock your MetaMask Accounts", modalOpen: true });

						} else {
							var account = web3.eth.accounts[0];
							setInterval(function () {
								web3.eth.getAccounts(function (err, accs) {
									if (accs[0] !== account) {
										account = web3.eth.accounts[0];
										window.location.reload();
									}
								});
							}, 2000);
							this.setState({ accounts: accs });

							//		              this.getBounties();
							// this.getCategories();
							//this.getMyBounties();
						}
					}
				}.bind(this));

			});
		} else {
			this.setState({ accounts: [], selectedNetwork: "1" });
			//this.getBounties();
			//this.getCategories();
		}
	}

	headers = () => {
		return <div style={{ paddingBottom: '1em' }}>
			<div style={{ paddingBottom: '1em' }}>
				<span style={{ float: 'left', paddingRight: '1em' }}>
					<Link onClick={() => window.history.back()} style={{ cursor: 'pointer' }}>
						About
            </Link>
				</span>
				<span style={{ fontWeight: 'bold' }}>Our Impact</span>
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

	render() {
		return (
			<div id="trafficking">
				<div id={"colourBodyLight"} style={{ minHeight: "100vh", position: "relative" }}>
					<Navigation userAddress={this.state.accounts[0] || ""} />
					<div style={{ overflow: "hidden", width: "100%", margin: "0 auto", paddingBottom: "160px", display: "block" }}>
						<div>
							<div style={{ marginBottom: "0px", boxShadow: "none", borderRadius: "0", padding: "30px", marginTop: "15px", border: "0", display: "block", backgroundColor: "rgb(249, 249, 249)", borderBottom: "0px solid #4A79FA", color: "#0F3057", paddingTop: "30px", marginLeft: "15px", marginRight: "15px" }} className="ContractCard">
								{this.headers()}
								<div style={{ clear: "both" }} />
								<div>
									<h2>Salvation Army: Human Trafficking</h2>
									<div style={{ float: "left", padding: "20px", borderRight: "1px solid #f73859", boxSizing: 'border-box', width: "40%" }}>
										<img src={arrows} style={{ width: "100%" }} />
									</div>
									<div style={{ float: "left", padding: "20px", boxSizing: 'border-box', width: "60%" }}>
										<img src={lines} style={{ width: "100%" }} />
									</div>
									<div style={{ clear: "both" }} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Tracking