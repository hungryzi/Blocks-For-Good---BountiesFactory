import React, { Component } from 'react'
import './Trafficking.css'

import Web3 from 'web3';
import Select from 'react-select';

import { Link } from 'react-router';

import 'whatwg-fetch';

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
const json = require('../../../contracts.json');
const IPFS = require('ipfs-mini');

//import logo from './images/logo.svg';
//import logoBounties from './images/logo-bounties.svg';
import logo from './images/logo.png'
import shoes from './images/shoes.jpg'
import search from './images/spyglass.png'

import FlatButton from 'material-ui/FlatButton';

import ContractList from 'components/ContractList/ContractList';
import Navigation from 'components/Navigation/Navigation';

import Dialog from 'material-ui/Dialog';
import SvgArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class Trafficking extends Component {
	  constructor(props) {
	    super(props)
	    
	    web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io"));

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
	      StandardBounties : web3.eth.contract(json.interfaces.StandardBounties).at(json.mainNet.standardBountiesAddress.v1),
	      UserComments : web3.eth.contract(json.interfaces.UserComments).at(json.mainNet.userCommentsAddress),
	      nextUrl: "",
	      categories: [],
	      value: "",
	      optionsUnseparated: "cryptochickscharity",
	      myDraft: 0,
	      myActive: 0,
	      myCompleted: 0,
	      myDead: 0,
	      myExpired: 0,
	      myTotal: 0,
	      resultsCount: 0,
	      baseURL: json.url.mainNet
	    }
	    
	    this.getInitialData = this.getInitialData.bind(this);
	    this.getBounties = this.getBounties.bind(this);
	    
	    this.getInitialData();
	    
	    //this.handleToggleSort = this.handleToggleSort.bind(this);
	  }
	  
//	  handleToggleSort(newSort){
//		    if (newSort === "Created" && this.state.sortBy === "Created"){
//		      this.setState({descending: !this.state.descending, loading: true, bounties: []}, this.getBounties)
//		    } else if (newSort === "Value" && this.state.sortBy === "Value"){
//		      this.setState({descending: !this.state.descending, loading: true, bounties: []}, this.getBounties)
//		    } else if (newSort === "Expiry" && this.state.sortBy === "Expiry"){
//		      this.setState({descending: !this.state.descending, loading: true, bounties: []}, this.getBounties)
//		    } else if (newSort === "Created"){
//		      this.setState({sortBy: "Created", descending: true, loading: true, bounties: []}, this.getBounties)
//		    } else if (newSort === "Value"){
//		      this.setState({sortBy: "Value", descending: true, loading: true, bounties: []}, this.getBounties)
//		    } else if (newSort === "Expiry"){
//		      this.setState({sortBy: "Expiry", descending: true, loading: true, bounties: []}, this.getBounties)
//		    }
//		  }
	  
	  getInitialData(){
		    window.loaded = true;

		    if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {

		      // Use Mist/MetaMask's provider
		        web3.setProvider(window.web3.currentProvider);

		        web3.version.getNetwork((err, netId) => {
		          console.log("rinkeby", json.url.rinkeby);

		          if (netId === "1"){
		            this.setState({StandardBounties : web3.eth.contract(json.interfaces.StandardBounties).at(json.mainNet.standardBountiesAddress.v1),
		                           UserCommentsContract: web3.eth.contract(json.interfaces.UserComments).at(json.mainNet.userCommentsAddress),
		                           selectedNetwork: netId,
		                          baseURL: json.url.mainNet});
		          } else if (netId === "4"){
		            this.setState({StandardBounties : web3.eth.contract(json.interfaces.StandardBounties).at(json.rinkeby.standardBountiesAddress.v1),
		                           StandardBountiesv0 : web3.eth.contract(json.interfaces.StandardBounties).at(json.rinkeby.standardBountiesAddress.v0),
		                           UserCommentsContract: web3.eth.contract(json.interfaces.UserComments).at(json.rinkeby.userCommentsAddress),
		                           selectedNetwork: netId,
		                          baseURL: json.url.rinkeby});
		                          console.log("rinkeby", json.url.rinkeby);
		          } else {
		            this.setState({modalError: ("Please change your Ethereum network to the Main Ethereum network or the Rinkeby network"), modalOpen: true});
		          }

		          setInterval(function() {
		            web3.version.getNetwork(function(err, newNetId){
		              if (netId !== newNetId) {
		                window.location.reload();
		              }
		            });
		          }, 2000);



		          web3.eth.getAccounts(function(err, accs){
		            if (err){
		              console.log ('error fetching accounts', err);
		            } else {
		              if (accs.length === 0){
		                this.setState({modalError: "Please unlock your MetaMask Accounts", modalOpen: true});

		              } else {
		              var account = web3.eth.accounts[0];
		              setInterval(function() {
		                web3.eth.getAccounts(function(err, accs){
		                  if (accs[0] !== account) {
		                    account = web3.eth.accounts[0];
		                    window.location.reload();
		                  }
		                });
		              }, 2000);
		              this.setState({accounts: accs});

		              this.getBounties();
		             // this.getCategories();
		              //this.getMyBounties();
		            }
		          }
		          }.bind(this));

		      });
		    } else {
		      this.setState({accounts: [], selectedNetwork: "1"});
		      this.getBounties();
		      this.getCategories();
		    }
		  }
	  
	  getBounties(){
		    var urlBase = this.state.baseURL+'/bounty/?limit=25';

		    var selectedStageUrl = "";

		    console.log('current stage:', this.state.selectedStage);

		    if (this.state.selectedStage === "Draft"){
		      selectedStageUrl = "&bountyStage=0";
		    } else if (this.state.selectedStage === "Active"){
		      selectedStageUrl = "&bountyStage=1";
		    } else if (this.state.selectedStage === "Dead"){
		      selectedStageUrl = "&bountyStage=2";
		    } else if (this.state.selectedStage === "Completed"){
		      selectedStageUrl = "&bountyStage=3";
		    } else if (this.state.selectedStage === "Expired"){
		      selectedStageUrl = "&bountyStage=4";
		    }

		    urlBase+=selectedStageUrl;

		    var selectedAddressUrl = "";

		    if (this.state.selectedMine !== "ANY"){
		      selectedAddressUrl = "&issuer="+this.state.accounts[0];
		    }

		    urlBase+=selectedAddressUrl;

		    var sortByUrl = "";
		    if (this.state.sortBy == "Created"){
		      if (this.state.descending){
		        sortByUrl = "&ordering=-bounty_created"
		      } else {
		        sortByUrl = "&ordering=bounty_created"
		      }
		    } else if (this.state.sortBy == "Value"){
		      if (this.state.descending){
		        sortByUrl = "&ordering=-fulfillmentAmount"
		      } else {
		        sortByUrl = "&ordering=fulfillmentAmount"
		      }
		    } else if (this.state.sortBy == "Expiry"){
		      if (this.state.descending){
		        sortByUrl = "&ordering=-deadline"
		      } else {
		        sortByUrl = "&ordering=deadline"
		      }
		    }

		    urlBase+=sortByUrl;

		    var urlCategories = "&categories__normalized_name__in="+this.state.optionsUnseparated

		    urlBase+=urlCategories;

		    urlBase+=("&search="+this.state.searchQuery);

		    fetch(urlBase)
		      .then(function(response) {
		        return response.json();

		      }.bind(this)).then(function(json) {
		        console.log('parsed json', json)

		        this.setState({bounties: json.results, loading: false, nextUrl: json.next, resultsCount: json.count});
		      }.bind(this)).catch(function(ex) {
		        console.log('parsing failed', ex)
		      });
		  }
	  
	  //populate() {
	//	  console.log();
	 // }
	  
	  render() {
		  var backgroundStyle = {
				  //backgroundImage: "url(" + shoes + ")",
				  //backgroundRepeat: "no-repeat",
				  //backgroundSize: "cover",
				  //backgroundColor: "#eee",
				  //opacity: 0.1,
				  position: 'absolute',
				  width: "100%",
				  height: "100%",
				  transform: "scaleX(-1)"
				};
//		  var foregroundStyle = {
//				  position: "absolute",
//				  lineHeight: "28px",
//				  backgroundColor: "#eee"
//		  }
//		  
//		  var headerStyle = {
//				  backgroundColor: "#364F6B",
//					  color: "white",
//					  padding: "10px"
//		  }
		  var headerH1Style = {
				  margin: "0px",
				  padding: "10px 10px"
		  }
		  var headerH2Style = {
				  margin: "0px"
		  }
		  var bodyStyle = {
				  padding: "20px",
		  fontFamily: "Verdana, Geneva, sans-serif",
		  fontSize: "18px"
		  }
		  var leftStyle = {
				  width: "50%",
				  padding: "20px",
				  float: "left"
		  }
		  var rightStyle = {
//				  width: "50%",
//				  padding: "20px",
				  float: "left"
		  }
		  var blockStyle = {
				  //float: "left",
				  //width: "100%",
				  padding: "20px",
				  marginBottom: "20px",
				  border: "1px solid #777",
				  backgroundColor: "#fafafa",
				  opacity: 0.8,
				  boxShadow: "2px 3px #ccc",
				  borderRadius: "4px",
				  cursor: "pointer"
		  }
		  var blockLeftStyle = {
				  float: "left"
		  }
		  var blockRightStyle = {
				  float: "right",
					  textAlign: "right"
		  }
		  var clearStyle = { 
				  clear: "left" ,
				  paddingTop: "20px"
		}
		  var clear = { clear: "both" };
		  var rightBox = { borderRight: "none" }
		  
		  var data = this.state.bounties;
		  var activeRows = data.map(function(row) {
			  var button = row.bountyStage == 0 ? 'Fund this Project' : 'Accept this Call'
		      var link = "/"+(row.bountyStage == 0 ? "bounty" : "bountyFulfillment")+"/v1/"+row.bounty_id;
			  return (
			  	<div style={blockStyle}>
			  	    <div style={blockLeftStyle}>
			  		<b>{row.title}</b><br/>
			  		{row.description}
			  		</div>
			  		<div style={blockRightStyle}>
			  		<b>${row.usd_price} USD</b><br/>
			  		<a href={link}>{button}</a>
			  		</div>
			  		<div style={clear}/>
			  	</div>
			  	)
		  });	  
		  
		  return (
				  <div id="trafficking">
					  <div id="foreground">
						  <div id="header">
						  	<img src={logo}/>
						  	<ul id="menu">
						  		<li><input placeholder="Search"/><img src={search}/></li>
							  	<li>About</li>
							  	<li>Start a Project</li>
							  	<li>Sign In</li>
						  	</ul>
						  </div>
						  <div style={bodyStyle}>
						  	<div id="dashStyle">
						  		<div><span>Total Donors</span>15,000</div>
						  		<div><span>Total Donated</span>2,000 ETH</div>
						  		<div><span>Funded Actions</span>100,000</div>
						  		<div style={rightBox}><span>Live Actions</span>3,000</div>
						  	</div>
						  	<div id="subMenu">
						  		<ul>
						  			<li id="selected">Human Trafficking</li>
						  			<li>Education</li>
						  			<li>Environment</li>
						  			<li>Hunger</li>
						  			<li>Health</li>
						  			<li>Poverty</li>
						  			<li>Child Mortality</li>
						  		</ul>
						  	</div>
						  		<h2 style={headerH2Style}>Human Trafficking in London</h2>
						  		<p>
						  		Around the world.  There are TWENTY-SEVEN MILLION SLAVES in the world today.  More than at any other point in human historyAnd the situation is dire and getting worse by the day.  This is the world’s fastest growing criminal industry generating $150 Billion in Illegal profits.Every 30 seconds, someone becomes a victim of modern-day slavery.Sex trafficking is a form of modern slavery that exists throughout the worldSex traffickers use violence, threats, lies, debt bondage, and other forms of coercion to compel victims to engage in commercial sex acts against their willThe situations that sex trafficking victims face vary dramatically. Many victims become romantically involved with someone who then forces or manipulates them into prostitution. Others are lured in with false promises of a job, such as modeling or dancing. Some are forced to sell sex by their parents or other family members.
						  		</p>
						  		<div>
						  			{activeRows}
						  		</div>
						  </div>
					  </div>
				  </div>
		  )
	  }
}

export default Trafficking


//	<p>
//	<ul>
//	<li>Sex trafficking occurs in a range of venues including fake massage businesses, via online ads or escort services, in residential brothels, on the street or at hotels</li>
//	<li>Sex trafficking is a form of modern slavery that exists throughout the world</li>
//	<li>Sex traffickers use violence, threats, lies, debt bondage, and other forms of coercion to compel victims to engage in commercial sex acts against their will</li>
//	<li>The situations that sex trafficking victims face vary dramatically. Many victims become romantically involved with someone who then forces or manipulates them into prostitution. Others are lured in with false promises of a job, such as modeling or dancing. Some are forced to sell sex by their parents or other family members.</li>
//	<li>Sex trafficking occurs in a range of venues including fake massage businesses, via online ads or escort services, in residential brothels, on the street or at hotels•Here in the UK the problem is getting worse.</li>
//	<li>In the UK in 2015, 3,266 people were identified as potential victims of trafficking. This is a 40% increase on 2014 figures.</li>
//	<li>30% of the potential victims were children.</li>
//	<li>The situation in London is critical.</li>
//	<li>The borough of Westminster has the highest rate of trafficking in the UK</li>
//	<li>In a recent ACPO report, 2,212 brothels were identified in London alone, and the police estimate that up to 50% of those working in the brothels may have been trafficked</li>
//	<li>Faced with this problem, what can we do?</li>
//	<li>The Victims are generally living in fear, often do not speak English, do not fully understand what is going on and comply with their abusers in hiding the reality -often because of threats of violence or fear of recrimination against their families back home</li>
//	<li>We have set out to reach out to the most vulnerable to show that they are cared for.</li>
//	</ul>
//	</p>