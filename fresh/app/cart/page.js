import Link from "next/link"
import { age, Hello } from './data'

export default function Cart() {

  let 장바구니 = ['Tomatoes', 'Pasta']
  
  return (
    <div>
      <h4 className="title">Cart</h4>
      {Hello()}
      <CartItem item={장바구니[0]} />
      <CartItem item={장바구니[1]}/>
      <Banner content={'현대카드'} />
      <Banner content={'신한카드'} />
      <Btn color={'skyblue'}/>
    </div>
  )
}

function CartItem(props) {
  return(
    <div className="cart-item">
        <p>상품명 { props.item }</p>
        <p>$40</p>
        <p>1개</p>
    </div>
  )
}

function Banner(props) {
  return(
    <h5>{props.content} 결제 행사중</h5>
  )
}

function Btn(props){
  return <button style={{ background : props.color }}>버튼임</button>
}
