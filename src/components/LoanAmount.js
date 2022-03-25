import React from 'react'

const LoanAmount = ({loanBalance}) => {
  return (
    <div>
       <div className="container-card">
           <p>Current Loan Balance: {loanBalance.balance}</p>
        </div>
    </div>
  )
}

export default LoanAmount
