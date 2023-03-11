
import './App.css';
import logo from './logo.png';
import button from './button.png';
import { BitcoinPaymentButton } from 'react-bitcoin-payment-button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // useState fields to store the list of orders, the billboard text, and the current price
  const [orders, setOrders] = useState([]);
  const [text, setText] = useState("Blockonomics helps you to track and accept Bitcoin payments");
  const [price, setPrice] = useState("0");

  // this function takes the current list of orders, selects the highest paid order, and sets the current price and current text 
  // to that of the highest order
  // order status must be completed to be considered
  const FilterData = () => {

    let max = 0;
    let index = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status === 2) {
        if (parseInt(orders[i].data.amount) > parseInt(max)) {
          max = parseInt(orders[i].data.amount);
          index = i;
        }
      }
    }

    setText(orders[index].data["Text"]);
    setPrice(orders[index].data.amount);
  }

  // press the page logo to refresh the page, which gets list of all orders made to the wallet through '/orders' end point in axios 
  // once it fetches the new list of orders, call FilterData() to set new price and text
   const refreshPage = () => {
    axios.get('/orders')
      .then(response => {
        console.log(response.data);
        setOrders(response.data);
        FilterData();
      })
      .catch(error => {
        console.log(error);
      });
   }

  // this is the page
  // we use the react BitcoinPaymentButton package 
  return (
    <div className="App">
      <div className="Header">

        <img src={logo} className ="logo" onClick={refreshPage}/>
        <p className = "bText">Billboard</p>
      </div>
      <div className = "Body">
        
        <div className= "billboard">
          <p className ="contentText">'{text}'</p>
        </div>
        <div className = "divider">

        </div>
        <div  className = "info">
          <p className = 'priceText'>Current Price:</p>
          <p className = 'moneyText'>{price} USD</p>
          <p className = "featureText">want to be featured on this billboard?</p>
          <BitcoinPaymentButton 
            uid="20b37fd24b0848f3"
            imageURL={button}
            font="Roboto, Helvetica, Arial, sans-serif"
            backgroundColor="#131a22"
            titleColor="#fff"
            descriptionColor="#fff"
            buttonColor="#428bca"
            hoverColor="#254563" 
            hideBlockonomics="true"
            inputHeights="44px"
            progressbarColor="#428bca" 
            BTCAmountColor="#428bca"        
          />
        </div>

      </div>
    </div>
  );
}

export default App;
