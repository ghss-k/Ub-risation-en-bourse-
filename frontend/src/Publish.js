import React, { Component } from 'react';
import { getWeb3, getInstance}  from "./Web3Util";
import AppNav from './AppNav';
import './App.css';




export class Publish extends Component {
      constructor(props) {
        super(props);
        this.state = { 
            imageValue: 'images/whale.png',
            description: '',
            title: '', 
            authorName: '',
            price: 0,
            date:'',
            user: '',
            balance: 0,
            contractInstance: '',
            networkId:'',
            networkType:'',
        };
        this.imageChange = this.imageChange.bind(this); // change image
        this.submitHandler = this.submitHandler.bind(this); // called when we submit the form (i.e. publish)
        this.changeHandler = this.changeHandler.bind(this); // gets called when we edit the image/art form info
      }

    // gets called automatically after component creation
    componentDidMount = async () => {
        const web3 = await getWeb3();
        window.web3 = web3;
        const contractInstance = await getInstance(web3);
        window.user = (await web3.eth.getAccounts())[0];
        const balanceInWei = await web3.eth.getBalance(window.user);
        var balance = web3.utils.fromWei(balanceInWei, 'ether');
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        this.setState({ user: window.user });
        this.setState({ balance: balance});
        this.setState({ contractInstance: contractInstance });
        this.setState({ networkId: networkId});
        this.setState({ networkType: networkType});
      }

      isNotEmpty(val) {
        return val && val.length>0;
    }
      // gets called when change in image occurs
      imageChange = (event) => {
        this.setState({ imageValue: event.target.value });
      };

      // get called when any update in the form
      changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
            }, function(){ })
    };
      // gets called when we click publish option
      submitHandler = (event) => {
        event.preventDefault(); // react default function to be called
        const {  imageValue, description, title, authorName, price, date} = this.state;
        if(this.isNotEmpty(title) &&this.isNotEmpty(description) &&this.isNotEmpty(authorName) 
            &&this.isNotEmpty(date)&&this.isNotEmpty(imageValue) && this.isNotEmpty(price)) {
            const priceInWei =  window.web3.utils.toWei(price, 'ether');
            this.publishArt(title, description, date, authorName, priceInWei, imageValue);  
        }
    }; 

      async publishArt(title, description, date, authorName, price, imageValue) {
        try {
            await this.state.contractInstance.methods.createFinxterToken(title,description, date, authorName, price, imageValue).send({
                from: this.state.user
            })
            this.props.history.push(`/home`) // automatically move to home page after publishing
            window.location.reload(); 
        } catch (e) {console.log('Error', e)}
    }

    render() {
    return (
        <div>
            <AppNav></AppNav>

            <section className="mx-auto" style={{ marginTop: '20px'}}>
                <div className="row">
                    <div className="col-md-2 mb-md-0 mb-5"></div>
                    <div className="col-md-8 mb-md-0 mb-5">
                        <div className="card">
                            <div className="card-body">
                                <form className="text-center border border-light p-5" onSubmit={this.submitHandler}>
                                    <p className="h4">Sell your stocks more easly today.</p>
                                    <div className="row">
                                        <div className="col-md-6 mb-md-0 mb-5">
                                            <input className="form-control mb-4" id="title" name="title" type="text" placeholder="Company name" onChange={this.changeHandler}  value={this.state.title}/>
                                            <input className="form-control mb-4" id="description" name="description"  type="text" placeholder="Description" onChange={this.changeHandler}  value={this.state.description}/>
                                           <input className="form-control mb-4" id="authorName" name="authorName" type="text" placeholder="Seller Name" onChange={this.changeHandler}  value={this.state.authorName}/>

                                        </div>
                                        <div className="col-md-6 mb-md-0 mb-5">
                                           <input className="form-control mb-4" id="price" name="price"  type="text" placeholder="Price (ether)"  onChange={this.changeHandler}  value={this.state.price}/>
                                           <input className="form-control mb-4" id="date" name="date"  type="text" placeholder="Date" onChange={this.changeHandler}   value={this.state.date}/>
                                           
                                            <select className="browser-default custom-select" onChange={this.imageChange} value={this.state.imageValue}>
                                                    
                                                    
                                                    <option value="images/cosumar-.png">images/cosumar-.png</option>
                                                    <option value="images/dari-couspate-.png">Dari</option>
                                                    <option value="images/afma-.png">Afma</option>
                                                    <option value="images/afric-industries-sa-.png">afric-industries-sa-.png</option>
                                                    <option value="images/afriquia-gaz-.png">afriquia-gaz-.png</option>
                                                    <option value="images/agma-lahlou-tazi-.png">agma-lahlou-tazi-.png</option>
                                                    <option value="images/afriquia-gaz-.png">afriquia-gaz-.png</option>
                                                    <option value="images/alliances-developpement-immobilier-sa-.png">alliances-developpement-immobilier-sa-</option>
                                                    <option value="images/aluminium-du-maroc-.png">aluminium-du-maroc-</option>
                                                    <option value="images/atlanta-.png">atlanta-</option>
                                                    <option value="images/attijariwafa-bank-.png">attijariwafa-bank-</option>
                                                    <option value="images/bcp-.png">bcp-</option>
                                                    <option value="images/bmce-bank-.png">bmce-bank-</option>
                                                    <option value="images/bmci-.png">bmci-</option>
                                                    <option value="images/cih-.png">cih-</option>
                                                    
                                            </select>
                                            <img className="imgBox z-depth-4 rounded" alt="art" src={this.state.imageValue} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 mb-md-0 mb-5"></div>
                                        <div className="col-md-2 mb-md-0 mb-5"><button className="btn btn-info btn-block" type="submit">Sell</button></div>
                                        <div className="col-md-5 mb-md-0 mb-5"></div>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-md-0 mb-5"></div>
                </div>

            </section>

        </div>
    );  // end of render
  } 
} // end of publish

export default Publish;
