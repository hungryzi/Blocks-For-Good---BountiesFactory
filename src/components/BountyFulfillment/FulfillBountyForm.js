import React, { Component } from 'react'
import { Link } from 'react-router';


export default class FulfillForm extends Component {
  render() {
    const { onSubmit, state } = this.props;
    return (

                  <div style={{paddingBottom: "0px"}}>
                    <form className='Fulfill' onSubmit={onSubmit} style={{overflow: "hidden", color: "rgb(25, 55, 83)"}}>
                      <div style={{width: "calc(50% - 15px)", display: "block", overflow: "hidden", float: "left", marginRight: "15px"}}>
                      <label htmlFor='name' style={{fontSize: "12px"}}>Contact Name</label>
                      <input id='name' className='SendAmount' style={{width: "100%", border: "0px", display: "block"}}/>
                      </div>
                      <div style={{width: "calc(50% - 15px)", display: "block", overflow: "hidden", float: "left", marginLeft: "15px"}}>
                      <label htmlFor='contact' style={{fontSize: "12px"}}>Contact Email</label>
                      <input id='contact' className='SendAmount' style={{width: "100%", border: "0px", display: "block"}}/>
                      </div>

                      <div style={{width: "100%", display: "block", overflow: "hidden", float: "left", marginRight: "0"}}>
                        <label htmlFor='deposit_amount' style={{fontSize: "12px", display: "block", width: "100%"}}>Submission Description and Comments</label>
                        <textarea id='bug_description' cols="60" rows="5" className='ContractCode' type='text' style={{width: "920px", border: "0px", padding: "15px", fontSize: "12px"}}></textarea>
                        {state.fulfillmentError &&
                          <p style={{fontSize: "12px", color: "#fa4c04", marginTop: "0px", textAlign: "center"}}>{state.fulfillmentError}</p>}
                      </div>
                      <div style={{width: "100%", display: "block", overflow: "hidden", float: "left", marginRight: "0"}}>
                      <button type='submit'  className='AddBtn' style={{backgroundColor: "#f73859", border:"0px", color: "color", display: "block", padding: "10px", margin: "0 auto", marginTop: "20px",marginBottom: "10px", fontSize: "1em", width: "200px"}}>SUBMIT</button>

                      </div>


                    </form>
                  </div>

    );
  }
}