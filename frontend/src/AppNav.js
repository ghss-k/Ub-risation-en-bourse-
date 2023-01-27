import React, { Component } from 'react'
import "./App.css";
import { getWeb3, getInstance}  from "./Web3Util";
import { withRouter} from 'react-router-dom';




export class AppNav extends Component {
    constructor(props) {
        super(props); // compulsory call for all class constructors
        this.state = {
              name: '',
              symbol: ''
          };
      }
  
      // called automatically after component initialisation
      // set symbol and name
      componentDidMount = async () => {
        const web3 = await getWeb3();
        const contractInstance = await getInstance(web3);
        window.user = (await web3.eth.getAccounts())[0];
        const symbol = await contractInstance.methods.get_symbol().call()
        this.setState({ symbol: symbol });
        const name = await contractInstance.methods.get_name().call();
        this.setState({ name: name });
    }
  
  
    render() {
      return (
        
      <nav className="navigation">
                  <div className="navbar-brand">  
                      <a className="navbar-item text-white" href="/" >
                      <img src='images/logor.png' width={110} height={75} alt='logo' /> 

                          
                      </a>  
                  </div> 
                  
                  <div
        className="navigation-menu">
        <ul>
        <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Buy stocks</a>
          </li>
          <li>
            <a href="/sellstock">Sell stocks</a>
          </li>
          <li>
            <a href="/mywallet">My wallet</a>
          </li>
          
        </ul>
      </div>
              </nav>
              
  
      );
    }
    

    
} // end of component

export default AppNav;
