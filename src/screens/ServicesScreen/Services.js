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


const Services = () => {

  const [loans,setLoans] = useState ([])
  const [customerInfo, setCustomerInfo] = useState ([])

  useEffect(()=>{

    setLoans(loanapi.loans)
   
  })
  return (
    <div>
      <AccountBalance></AccountBalance>
      <LoanAmount></LoanAmount>
      <Loans loans={loans}></Loans>
    </div>
   
  )
}

export default Services