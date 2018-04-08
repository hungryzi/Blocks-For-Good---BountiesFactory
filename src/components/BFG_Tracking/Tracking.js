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
import piechart from './images/piechart.png'

import FlatButton from 'material-ui/FlatButton';

import ContractList from 'components/ContractList/ContractList';
import Navigation from 'components/Navigation/Navigation';

import Dialog from 'material-ui/Dialog';
import SvgArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class Tracking extends Component {
	  constructor(props) {
		    super(props)
	  }
	  
	  render() {
		  return (
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
				  <div>
				  <img src={piechart}/>
</div>
			  </div>
			)
	  }
}

export default Tracking