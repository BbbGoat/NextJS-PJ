import Image from "next/image"
import food from "@/public/food0.png"

export default function List() {

  let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
  
  return (
    <div>
      <h4 className="title">Products</h4>

      {
        상품.map((a,i)=>(
          <div className="food" key={i}>
            <img src={`/food`+i+'.png'} className="food-img" alt="음식사진" />
            {/* <Image src={food} className="food-img" alt="음식사진" /> */}
            <h4>{상품[i]} $40</h4>
          </div>
        ))
      }
    </div>
  )
}