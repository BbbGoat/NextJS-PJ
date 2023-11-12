import Product from '@/components/product/Product'
import Slider from '@/components/slider/Slider'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Slider />
      <Product />
    </>
  )
}
