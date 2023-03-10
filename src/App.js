
import './App.css';
import logo from './logo.png';
import button from './button.png';
import { BitcoinPaymentButton } from 'react-bitcoin-payment-button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [orders, setOrders] = useState([]);
  const [text, setText] = useState("Blockonomics helps you to track and accept Bitcoin payments");
  const [price, setPrice] = useState("12.00");

  useEffect(() => {
    axios.get('/orders')
      .then(response => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      
      // let max = 0;
      // let index = 0;
      // for (let i = 0; i < orders.length; i++) {
      //   console.log("orders" + orders);
      //   if (orders[i].status === 2) {
      //     if (parseInt(orders[i].data.amount) > parseInt(max)) {
      //       max = parseInt(orders[i].data.amount);
      //       index = i;
      //     }
      //   }
      // }

      // setText(orders[index].data[2]);
      // setPrice(orders[index].data.amount);

  }, []);


  // have database that have all the payments, with two columns amount and text
  // useEffect finds text correlated to the greatest paid amound, and displays that text, as well as that amount to the website

  // todo: after the payment, put payment info to database
  //       useEffect that fetches information correlated to the highest payment in the database
  //       display that info to the webpage


  return (
    <div className="App">
      <div className="Header">
        <img src={logo} className ="logo"/>
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
            uid="94e4215dcff746f8"
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
