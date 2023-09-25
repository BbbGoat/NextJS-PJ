'use client'

import Image from "next/image"
import food from "@/public/food0.png"
import { useState } from "react"
export default function List() {

  let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
  let [수량, 수량변경] = useState([0, 1, 2])
  
  return (
    <div>
      <h4 className="title">Products</h4>

      {
        상품.map((a,i)=>(
          <div className="food" key={i}>
            <img src={`/food`+i+'.png'} className="food-img" alt="음식사진" />
            {/* <Image src={food} className="food-img" alt="음식사진" /> */}
            <h4>{a} $40</h4>
            <span> {수량[i]} </span>
            <button onClick={()=>{
              let copy = [...수량]
              copy[i]++
              수량변경(copy)
            }}>+</button>
            <button onClick={()=>{
              let copy = [...수량]
              copy[i]--
              수량변경(copy)
            }}>-</button>
          </div>
        ))
      }
    </div>
  )
}