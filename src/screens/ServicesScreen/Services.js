import React from 'react'

import { useEffect, useState } from 'react';
//for data import
import * as Data from'../../api/data'
import * as localData from '../../api/localHostData';
import * as v9_firestore from '../../api/v9_firestore';
import * as v9_auth from '../../api/v9_auth';
import AccountBalance from '../../components/AccountBalance';
import LoanAmount from '../../components/LoanAmount';
import Loans from '../../components/Loans'
import * as loanapi from "../../api/loans"
import * as customer from "../../api/customers"
import { FaTasks } from 'react-icons/fa';


const Services = () => {

  const [loans,setLoans] = useState ([])
  const [customerInfo, setCustomerInfo] = useState ([])
  const [loanAmount, setLoanAmount] = useState ([])

  
  const fetchCustomer = async (id) =>{
    const res = await fetch(`http://localhost:5000/Customers/${id}`)
    const data = await res.json()
    
    return data
  } 
  const fetchLoans = async () =>{
    const res = await fetch(`http://localhost:5000/Loans`)
    const data = await res.json()
   
    return data
  } 

  const fetchLoanBalance = async (id) =>{
    const res = await fetch(`http://localhost:5000/Customers/${id}`)
    const data = await res.json()
    
    return data
  } 

  useEffect(()=>{
    
    
  
     const getCustomer = async () =>{
     const customerFromServer = await fetchCustomer(1)
     setCustomerInfo(customerFromServer)
   }
     getCustomer()
    
     const getLoans = async () =>{
      const loansFromServer = await fetchLoans()
      setLoans(loansFromServer)
    }

    getLoans()

    const getLoanAmount = async () =>{
      const loanAmtFromServer = await fetchLoanBalance(1)
      setLoanAmount(loanAmtFromServer)
    }
    
    getLoanAmount()
    

  

  },[])

  
  return (
    <div>
      <AccountBalance customer={customerInfo} ></AccountBalance>
      <LoanAmount loanBalance={loanAmount}></LoanAmount>
      <div className="container-card">{loans.length > 0? (<Loans loans={loans}></Loans>) : ("No Loans")}</div>
      
    </div>
   
  )
}

export default Services