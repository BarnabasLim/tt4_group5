import React from 'react'


const Loan = ({loan}) => {
  return (
    <div className="loan-container">
      <p>Loan Id :{loan.id}</p>
      <p>Loan Amount: {loan.loan_amount}</p>
    </div>
  )
}

export default Loan
