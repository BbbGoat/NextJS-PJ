import React from 'react'

const OrderDetails = ({ params, searchParams }) => {
  
  const { id } = params;
  const { hello } = searchParams;

  console.log(id, hello)
  
  return (
    <div>
      {id}
      {hello}
    </div>
  )
}

export default OrderDetails