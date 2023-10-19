'use client'
import useFetchCollection from '@/hooks/useFetchCollection'
import React from 'react'
import styles from './Product.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { STORE_PRODUCTS } from '@/redux/slice/productSlice'
import Loader from '../loader/Loader'
import ProductList from './productList/ProductList'
import ProductFilter from './productFilter/ProductFilter'

const Product = () => {

  const { data, isLoading } = useFetchCollection('products');
  // console.log(data);

  const dispatch = useDispatch();

  // store에 데이터 넣기
  useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        products: data
      })
    )
  }, [data, dispatch])

  const products = useSelector(selectProducts)
  
  return (
    <section className={styles.product}>
      <aside
        className={styles.filter}
      >
        { isLoading ? null : <ProductFilter /> }
      </aside>
      <div className={styles.content}>
        { isLoading ? <Loader basic /> : <ProductList /> }
      </div>
    </section>
  )
}

export default Product