'use client'
import React, { useEffect } from 'react'
import styles from './CartClient.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '@/redux/slice/cartSlice'
import { useRouter } from 'next/navigation'
import { selectIsLoggedIn } from '@/redux/slice/authSlice'

const CartClient = () => {

    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    const dispatch = useDispatch();
    const router = useRouter();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const increaseCart = (cart) => {
        dispatch(ADD_TO_CART(cart));
    }
    const decreaseCart = (cart) => {
        // dispatch()
    }
    const removeFromCart = (cart) => {

    }
    const clearCart = () => {

    }
    
    useEffect(()=>{
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
        dispatch(SAVE_URL('')); // 초기화
    }, [dispatch, cartItems])
    
  return (
    <div>CartClient</div>
  )
}

export default CartClient