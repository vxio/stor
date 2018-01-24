import React from 'react'

const OrderSummary = (props) => {
    const submittedInfo = props.location.state

    console.log(props.location.state)
  return (
    <div>
      <h1>Order Summary Page</h1> 
    </div>
  )
}

export default OrderSummary
