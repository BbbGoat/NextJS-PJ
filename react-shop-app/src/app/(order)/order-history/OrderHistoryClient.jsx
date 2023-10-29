import React, { useEffect } from 'react'
import styles from './OrderHistory.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '@/redux/slice/orderSlice';
import { selectUserId } from '@/redux/slice/authSlice';

const OrderHistoryClient = () => {

    // 주문 데이터 받아오기
    const {data, isLoading} = useFetchCollection('orders');
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(STORE_ORDERS(data));

    }, [dispatch, data]);

    const orders = useSelector(selectOrderHistory);
    const userId = useSelector(selectUserId);
    
  return (
    <div>OrderHistoryClient</div>
  )
}

export default OrderHistoryClient