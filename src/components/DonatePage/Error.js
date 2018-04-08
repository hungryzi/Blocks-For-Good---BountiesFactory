import React, { Component } from 'react'

class Error extends Component {
  render() {
    return <div style={{marginBottom: "0px", boxShadow: "none", borderRadius: "0", padding: "30px", marginTop: "15px", border: "0", backgroundColor: "rgb(249, 249, 249)", borderBottom: "0px solid #4A79FA", color:"#2D0874", paddingTop: "30px", marginLeft: "15px", marginRight: "15px"}} className="ContractCard">
              <h3 className="bountyHeader" style={{margin: "0px 15px 30px 15px", width: "100%", display: "inline", fontSize: "28px", textAlign: "center",  fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden"}}>{"There's Nothing Here!"}</h3>
              <h4 className="bountyHeader" style={{margin: "0px 15px 30px 15px", width: "100%", display: "inline", fontSize: "22px", textAlign: "center",  fontWeight: "500", textOverflow: "ellipsis", overflow: "hidden"}}>{"Maybe someone sent you here by mistake, but this bounty doesn't exist. It's possible someone sent you this link for a bounty on the "}<b style={{fontWeight: "600"}}>Rinkeby Testnet,</b></h4>
              <h4 className="bountyHeader" style={{margin: "0px 15px 30px 15px", width: "100%", display: "inline", fontSize: "22px", textAlign: "center",  fontWeight: "500", textOverflow: "ellipsis", overflow: "hidden"}}>{"Try changing your Metamask network to the Rinkeby Network instead."}</h4>
              <h4 className="bountyHeader" style={{margin: "0px 15px 30px 15px", width: "100%", display: "inline", fontSize: "28px", textAlign: "center",  fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden"}}><Link to="/">Go Home</Link></h4>
            </div>;
  }
}

export default Error;