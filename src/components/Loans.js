import React from 'react'
import Loan from './Loan'



const Loans = ({loans}) => {
  return (
    <div >
        {loans.map((loan)=>(
            <Loan key={loan.id} loan={loan}/>
        ))}
       
    </div>
  )
}

export default Loans
