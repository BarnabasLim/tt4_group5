import React from 'react'
//Leonardl
import { useEffect, useState } from 'react';
//for data import
import * as Data from'../../api/data'
import * as localData from '../../api/localHostData';
import * as v9_firestore from '../../api/v9_firestore';
import * as v9_auth from '../../api/v9_auth';
const LoansPayment = () => {
  
  // let returnLoan = 
 
  
  
  const [value, setValue]= React.useState(0)
  const [loan, setLoan] = React.useState(
    
    {
      currentBalance:  1000 ,
      loanAmt: 500 ,
    }
  )

  function getInputValue(event){
    // show the user input value to console
    const userValue = event.target.value;

    console.log(userValue);
    setValue(userValue)
  };

  

    function handleSubmit(event){
      event.preventDefault()
      setLoan(
        prevState => { 
          return {
            currentBalance: prevState.currentBalance - value,
            loanAmt :prevState.loanAmt -  value
           
        }
      }
      )
    }
  




  return (
    <div>
      <h1>Loan Payment</h1>
      <p> Current balance:$ {loan.currentBalance} </p>
      <p> Loan amount: $ {loan.loanAmt} </p>
      <p> Interest rate: 2.88% </p>
      <form onSubmit={handleSubmit}>
        <label for="loanpayment">Enter the amount for loan payment : $</label> 
        <input
          type="number"
          placeholder="Enter the amount"
          onChange={getInputValue}
          name="loanpayment"
         // value={}
            />
          <button >
            Pay Loan
          </button>
      </form>
    </div>
  )
}



export default LoansPayment