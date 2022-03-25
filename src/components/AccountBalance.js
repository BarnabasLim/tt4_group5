import React from 'react'

const AccountBalance = ({customer}) => {
  return (
    <div>
      
        <div className="container-card">
           <p>Account Balance: {customer.balance}</p>
        </div>
    </div>
  )
}

export default AccountBalance
