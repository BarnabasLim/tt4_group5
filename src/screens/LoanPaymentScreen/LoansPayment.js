import React from 'react'
//Leonardl
import { useEffect, useState } from 'react';
//for data import
import { useParams } from "react-router-dom";


// <h1> Articles by {name} </h1>
import * as Data from'../../api/data'
import * as localData from '../../api/localHostData';
import * as v9_firestore from '../../api/v9_firestore';
import * as v9_auth from '../../api/v9_auth';
import * as loanapi from "../../api/loans"
import * as customerapi from "../../api/customers"
const LoansPayment = () => {
  
  let {id} = useParams();
  const [loans,setLoans] = useState ([])
  const [customerInfo, setCustomerInfo] = useState ([])
  


  const fetchCustomer = async (id) =>  {
    const res = await fetch(`http://localhost:5000/customers/${id}`)
    const data = await res.json()

    return data
  }

  const fetchLoans = async (id) =>  {
    const res = await fetch(`http://localhost:5000/loans/${id}`)
    const data = await res.json()

    return data
   
  }

  // const handleEdit = async (id) =>{
  //   const updatedTask = await getTask(id)
    
  //   try{
  //   const response = await api.put(`/tasks/${id}`, {...updatedTask.data, reminder : !updatedTask.data.reminder})
  //   console.log(response.data)
  //   setTasks (tasks.map(task => task.id === id ? {...response.data } : task))
  //   }catch(err){
  //   console.log(err.message)
  //   }
  //   }



  useEffect(()=>{
    const getCustomer = async () =>{
    const customerFromServer = await fetchCustomer(1)
    setCustomerInfo(customerFromServer)
    }
    getCustomer()
    const getLoans = async () =>{
    const loansFromServer = await fetchLoans(2)
    setLoans(loansFromServer)
    }
    
    getLoans()
    
    },[customerInfo.id])

    

  let balance = customerInfo.balance
  let loan_amt = loans.loan_amount


  const [value, setValue]= React.useState(0)
  

  function getInputValue(event){
    // show the user input value to console
    const userValue = event.target.value;

    // console.log(userValue);
    setValue(userValue)
  };

  

  
  
    function handleSubmit(e){
      let newBalances = balance-value
      let newLoanAmts =  loan_amt -value
      e.preventDefault();
      // console.log(newBalance)
      setLoans(
         prevState => { 
          return {...prevState, loan_amount: prevState.loan_amount-value}
          })

        setCustomerInfo(
          prevState => { 
            return {...prevState, balance: prevState.balance-value}
            })
          }
    
  




  return (
    <div className="payloan">
      <h1>Loans Payment</h1>
      <p> Current balance:$ {balance} </p>
      <p> Loan amount: $ {loan_amt} </p>
      <p> Interest rate: 2.88% </p>
      <form onSubmit={ handleSubmit}>
        <label for="loanpayment">Enter the amount for loan payment : $</label> 
        <input
          type="number"
          placeholder="Enter the amount"
          onChange={getInputValue}
          name="loanpayment"
         // value={}
            />
          <button className="form--submit" >
            Pay Loan
          </button>
      </form>
    </div>
  )
}



export default LoansPayment