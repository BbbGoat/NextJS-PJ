import Link from "next/link"
import { age, Hello } from './data'

export default function Cart() {

  let 장바구니 = ['Tomatoes', 'Pasta']
  
  return (
    <div>
      <h4 className="title">Cart</h4>
      {Hello()}
      <CartItem 장바구니={장바구니[0]} />
      <CartItem 장바구니={장바구니[1]}/>
      
    </div>
  )
}

function CartItem(props) {
  return(
    <div className="cart-item">
        <p>{ props.장바구니 }</p>
        <p>$40</p>
        <p>1개</p>
    </div>
  )
}