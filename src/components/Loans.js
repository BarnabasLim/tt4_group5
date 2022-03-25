import React from 'react'
import Loan from './Loan'



const Loans = ({loans}) => {
  return (
    <div class='container-card'>
        {loans.map((loan)=>(
            <Loan key={loan.Loanid} loan={loan}/>
        ))}
       
    </div>
  )
}

export default Loans
